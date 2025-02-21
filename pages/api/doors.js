import connectMongo from '@/lib/mongodb';
import Door from '@/models/doors';
import nodemailer from 'nodemailer';
import User from '@/models/user'

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectMongo();

        const { name0, email, phoneNumber, ...queryData } = req.body;


        let doorData = req.body;
        if (Array.isArray(doorData.extras)) {
            doorData.extras = doorData.extras.join(', ');
        }
        if (typeof doorData.blind === 'object' && doorData.blind !== null) {
            doorData.blind = doorData.blind.name || '';
        }

        // Save the user in the database
        const user = new User({ name0, email, phoneNumber });
        await user.save();

        const newDoor = new Door({ ...doorData, user: user._id });
        await newDoor.save();



        if (!email) {
            return res.status(201).json({ success: true, message: "Data saved, but no email provided." });
        }



        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use TLS
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: process.env.SMTP_USER, // Your Gmail
                pass: process.env.SMTP_PASS  // Your App Password
            }
        });


        const emailContent = `
        <div style="font-family: Arial, sans-serif;">
            <h3>Your Submission Details</h3>
            <p><strong>Name:</strong> ${name0}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Query Details:</strong></p>
    
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-2">Key</th>
                        <th class="border border-gray-300 px-4 py-2">Value</th>
                    </tr>
                </thead>
                <tbody>
                                    ${Object.entries(queryData)
                .filter(([_, value]) => value !== "" && value !== null && value !== undefined)
                .map(([key, value]) => {
                    // If value is an object, remove 'image' and display other properties
                    if (typeof value === 'object' && value !== null) {
                        const filteredEntries = Object.entries(value)
                            .filter(([subKey]) => subKey !== 'image') // Exclude 'image'
                            .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                            .join(', '); // Join remaining properties

                        return `
                                <tr>
                                    <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold; width: 40%;">${key}</td>
                                    <td style="border: 1px solid #ccc; padding: 10px; width: 60%;">${filteredEntries}</td>
                                </tr>
                            `;
                    }

                    // Normal case for non-object values
                    return `
                            <tr>
                                <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold; width: 40%;">${key}</td>
                                <td style="border: 1px solid #ccc; padding: 10px; width: 60%;">${value}</td>
                            </tr>
                        `;
                }).join('')}
                </tbody>
            </table>
        </div>
    `;


        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Your Submitted Information",
            html: emailContent,
        };


        await transporter.sendMail(mailOptions);

        return res.status(201).json({ success: true, message: "Data saved & email sent!" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default handler;
