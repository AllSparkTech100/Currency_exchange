import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@mui/material";


function Exchange() {
    const [rates, setRates] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/{endpoint}")
            .then(response => {
                setRates(response.data.rates);
            })
            .catch(error => console.error("Error fetching exchange rates:", error));
    }, []);

    const filteredRates = Object.entries(rates).filter(([currency]) =>
        currency.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-6">
                <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Live Exchange Rates</h1>
                    <Input
                        type="text"
                        placeholder="Search currency..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-4"
                    />
                    <div className="overflow-y-auto max-h-80">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border">Currency</th>
                                    <th className="py-2 px-4 border">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRates.map(([currency, rate]) => (
                                    <tr key={currency} className="border">
                                        <td className="py-2 px-4">{currency}</td>
                                        <td className="py-2 px-4">{rate.toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Exchange