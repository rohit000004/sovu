import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ReceiptPage = () => {
    const router = useRouter();
    const { query } = router;
    const [formattedQuery, setFormattedQuery] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const [userData, setUserData] = useState({
        name0: "",
        email: "",
        phoneNumber: "",
    });

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

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formattedQuery,
            ...userData
        };

        var API_ENDPOINT;
        if (formattedQuery.name == "Aluminium Flat Roof" || formattedQuery.name == "Aluminium Roof Lantern") {
            API_ENDPOINT = "/api/roof"
        }
        else if (formattedQuery.name == "Aluminium Casement Window" || formattedQuery.name == "Aluminium Fixed Window" || formattedQuery.name == "Aluminium Shaped Window" || formattedQuery.name == "Aluminium UPVC Window") {
            API_ENDPOINT = "/api/windows"
        }
        else {
            API_ENDPOINT = "/api/doors"
        }

        try {
            const response = await fetch(`${API_ENDPOINT}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data?.message) {
                setTimeout(() => {
                    window.alert("Details saved & email sent successfully!");
                }, 500);
                setLoading(false);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    const handleOpen = () => {
        setIsOpen(true);
    }

    return (
        <div>
            <table className="mx-auto text-[12px] border border-gray-300 mt-3">
                <thead>
                    <tr className="bg-gray-100">
                        <th colSpan={2} className="px-4 py-2 text-[15px] bg-[#16a1d9] text-white">{formattedQuery?.name}</th>
                        {/* <th className="px-4 py-2 text-[15px] bg-[#16a1d9]"></th> */}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(formattedQuery)
                        .filter(([key, value]) =>
                            key && key !== "image" && key !== "name" && value !== "" && value !== null &&
                            !(typeof value === "object" && Object.keys(value).length === 0) // ✅ Remove empty objects
                        )
                        .map(([key, value]) => (
                            <tr key={key} className="border-t border-gray-300">
                                <td className="px-4 py-1 text-gray-800 capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}:
                                </td>
                                <td className="px-4 py-1 font-bold text-gray-800 capitalize">
                                    {/* Check if value is an object */}
                                    {typeof value === "object" && value !== null ? (
                                        Array.isArray(value) ? (
                                            value.join(", ") // ✅ Convert arrays to string
                                        ) : (
                                            Object.entries(value)
                                                .filter(([subKey, subValue]) => subKey !== "image" && subValue !== "" && subValue !== null) // ✅ Remove "image"
                                                .map(([subKey, subValue]) => (
                                                    <div key={subKey}>
                                                        {subKey === "name" ? subValue : `${subKey}: ${subValue}`} {/* ✅ Show only value if subKey is "name" */}
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

                    className="py-1 px-2 font-bold bg-[#16a1d9] text-[10px] rounded-md text-sm text-white mt-5 hover:scale-105 transition-transform disabled:opacity-50"
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
                                    <label htmlFor="name0" className="block mb-2 text-sm font-medium text-gray-900">
                                        Your Name
                                    </label>
                                    <input
                                        name="name0"
                                        value={userData.name0}
                                        onChange={handleUserChange}
                                        type="text"
                                        id="name0"
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
                                        value={userData.email}
                                        onChange={handleUserChange}
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
                                        value={userData.phoneNumber}
                                        onChange={handleUserChange}
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
