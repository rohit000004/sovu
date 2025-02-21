import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ReceiptPage = () => {
    const router = useRouter();
    const { query } = router;
    const [formattedQuery, setFormattedQuery] = useState({});
    const [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [values, setValues] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });



    const { name, email, phoneNumber } = values;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };





    const handleOpen = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        const parsedQuery = Object.fromEntries(
            Object.entries(query).map(([key, value]) => {
                try {
                    return [key, JSON.parse(value)];
                } catch {
                    return [key, value];
                }
            })
        );
        setFormattedQuery(parsedQuery);
    }, [query]);

    const handleSubmit0 = async () => {

        setLoading(true);

        try {
            const response = await fetch('/api/doors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Door entry created successfully!");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }

    };


    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/doors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...query, email: email }), // Include email
            });

            const data = await response.json();

            if (response.ok) {
                alert("Door entry created successfully! An email has been sent.");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <table className="mx-auto text-[12px] border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-[15px]">Specifications</th>
                        <th className="px-4 py-2 text-[15px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(formattedQuery)
                        .filter(([key, value]) =>
                            key && key !== "image" && value !== "" && value !== null &&
                            !(typeof value === "object" && Object.keys(value).length === 0) // ✅ Remove empty objects
                        )
                        .map(([key, value]) => (
                            <tr key={key} className="border-t border-gray-300">
                                <td className="px-4 py-1 text-gray-800 capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}:
                                </td>
                                <td className="px-4 py-1 font-bold text-gray-800 capitalize">
                                    {/* Check if value is an object and render appropriately */}
                                    {typeof value === "object" && value !== null ? (
                                        Array.isArray(value) ? (
                                            value.join(", ") // ✅ Convert arrays to string
                                        ) : (
                                            Object.entries(value)
                                                .filter(([subKey, subValue]) => subKey !== "image" && subValue !== "" && subValue !== null) // ✅ Remove "image" from nested objects
                                                .map(([subKey, subValue]) => (
                                                    <div key={subKey}>
                                                        <span className="font-medium">{subKey}: </span>
                                                        {subValue}
                                                    </div>
                                                ))
                                        )
                                    ) : (
                                        value
                                    )}
                                </td>
                            </tr>
                        ))}


                </tbody>
            </table>

            <div className="flex justify-center">
                <button onClick={handleOpen}

                    className="py-1 px-2 font-bold bg-black text-[10px] rounded-md text-sm text-white mt-5 hover:scale-105 transition-transform disabled:opacity-50"
                    disabled={loading}
                >
                    Get Price
                </button>
            </div>






            <div className="flex justify-center items-center ">

                {/* Modal */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">

                            <button onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
                            >  ✖</button>

                            <form onSubmit={handleSubmit}>
                                <div className="my-1">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                        Your Name
                                    </label>
                                    <input
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        type="text"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Name"
                                        required
                                    />
                                </div>

                                <div className="my-1">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        type="number"
                                        id="phoneNumber"
                                        placeholder="Phone Number"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </form>

                        </div>
                    </div>
                )}
            </div>








        </div>
    );
};

export default ReceiptPage;
