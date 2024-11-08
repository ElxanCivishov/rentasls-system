import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { buildings } from "../Buildings/consts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalStatisticsChart: React.FC = () => {
    const totalStatistics = buildings.reduce(
        (acc, building) => {
            acc.totalRooms += building.numberOfRooms;
            acc.emptyRooms += building.emptyRooms;
            acc.roomsForRent += building.numberOfRoomsForRent;
            acc.areaEmpty += building.areaEmptyRooms;
            acc.areaForRent += building.areaOfRoomsForRent;
            acc.totalArea += building.totalArea;
            acc.totalOfficialPayment += building.official_payment;
            acc.totalUnofficialPayment += building.unofficial_payment;
            acc.totalDebtAggregate += building.total_debt;

            return acc;
        },
        {
            totalRooms: 0,
            emptyRooms: 0,
            roomsForRent: 0,
            areaEmpty: 0,
            areaForRent: 0,
            totalArea: 0,
            totalOfficialPayment: 0,
            totalUnofficialPayment: 0,
            totalDebtAggregate: 0,
        },
    );

    const totalStatsData = {
        labels: labels,
        datasets: [
            {
                label: "Statistika",
                data: [
                    totalStatistics.totalRooms,
                    totalStatistics.emptyRooms,
                    totalStatistics.roomsForRent,
                    totalStatistics.totalArea,
                    totalStatistics.areaEmpty,
                    totalStatistics.areaForRent,
                    totalStatistics.totalOfficialPayment,
                    totalStatistics.totalUnofficialPayment,
                    totalStatistics.totalDebtAggregate,
                ],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='bar-chart'>
            <Bar data={totalStatsData} options={totalStatsOptions} height='30px' width='100%' />
            {/* <StatisticsTextList {...totalStatistics} /> */}
        </div>
    );
};

export default TotalStatisticsChart;

const labels = [
    "Ümumi otaq sayı",
    "Boş otaq sayı",
    "Kirayə verilən otaq sayı",
    "Ümumi sahə (kv.m)",
    "Boş sahə (kv.m)",
    "Kirayə verilən sahə (kv.m)",
    "Rəsmi ödəniş",
    "Q-rəsmi ödəniş",
    "Cəmi borc",
];

const colors = [
    "rgba(255, 99, 132, 0.8)", // Red
    "rgba(54, 162, 235, 0.8)", // Blue
    "rgba(255, 206, 86, 0.8)", // Yellow
    "rgba(75, 192, 192, 0.8)", // Teal
    "rgba(153, 102, 255, 0.8)", // Purple
    "rgba(255, 159, 64, 0.8)", // Orange
    "rgba(255, 99, 71, 0.8)", // Tomato
    "rgba(173, 216, 230, 0.8)", // Light Blue
    "rgba(255, 20, 147, 0.8)", // Deep Pink
    "rgba(124, 252, 0, 0.8)", // Lawn Green
];

const totalStatsOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "Ümumi binalar üzrə statistikalar",
        },
        tooltip: {
            mode: "index" as const,
            intersect: false,
        },
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            title: {
                display: false,
            } as const,
        },
        y: {
            title: {
                display: true,
                text: "Sayı / Sahə (kv.m)",
                font: { size: 18, weight: "bold" } as const,
            },
        },
    },
};
