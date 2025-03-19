import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, MenuItem, Select } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function History() {
    const [currency, setCurrency] = useState("USD");
    const [historicalData, setHistoricalData] = useState([]);
    const [dates, setDates] = useState([]);
    const [startDate, setStartDate] = useState("2024-03-01");
    const [endDate, setEndDate] = useState("2024-03-10");

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const response = await axios.get(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}.json`
                );
                const rates = response.data.rates;
                const formattedDates = Object.keys(rates);
                const formattedRates = formattedDates.map(date => rates[date][currency]);
                setDates(formattedDates);
                setHistoricalData(formattedRates);
            } catch (error) {
                console.error("Error fetching historical data:", error);
            }
        };
        fetchHistoricalData();
    }, [currency, startDate, endDate]);
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 text-center w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Historical Exchange Rates</h1>
                    <div className="flex justify-center space-x-4 mb-4">
                        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                        </Select>
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <Line
                        data={{
                            labels: dates,
                            datasets: [{
                                label: `Exchange Rate for ${currency}`,
                                data: historicalData,
                                borderColor: "#3b82f6",
                                fill: false,
                            }],
                        }}
                    />
                </div>
            </div>

        </>
    )
}

export default History