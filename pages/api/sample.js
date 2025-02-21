import connectMongo from '@/lib/mongodb';
import Door from '@/models/doors';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectMongo();

        let doorData = req.body;
        if (Array.isArray(doorData.extras)) {
            doorData.extras = doorData.extras.join(', ');
        }
        if (typeof doorData.blind === 'object' && doorData.blind !== null) {
            doorData.blind = doorData.blind.name || '';
        }

        const newDoor = new Door(doorData);
        await newDoor.save();
        return res.status(201).json({ success: true, message: "Door entry created successfully!" });

    } catch (error) {
        console.error("Error saving door data:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default handler;
