import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { buildings } from "../Buildings/consts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllBuildingsChart: React.FC = () => {
    const allLabels = buildings.map((building) => building.name);

    const totalRooms = buildings.map((building) => building.statistics.reduce((sum, stat) => sum + stat.countOfRooms, 0));

    const emptyRooms = buildings.map((building) => building.statistics.reduce((sum, stat) => sum + stat.emptyRooms, 0));

    const roomsForRent = buildings.map((building) => building.statistics.reduce((sum, stat) => sum + stat.countOfRoomsForRent, 0));

    const areaEmpty = buildings.map((building) => building.statistics.reduce((sum, stat) => sum + stat.areaEmptyRooms, 0));

    const areaForRent = buildings.map((building) => building.statistics.reduce((sum, stat) => sum + stat.areaOfRoomsForRent, 0));

    const totalArea = buildings.map((building) => building.statistics.reduce((sum, stat) => sum + stat.totalArea, 0));

    const allData = {
        labels: allLabels,
        datasets: [
            {
                label: "Otaq sayı",
                data: totalRooms,
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Boş otaqlar",
                data: emptyRooms,
                backgroundColor: "rgba(255, 99, 132, 0.7)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Kirayə verilən otaqlar",
                data: roomsForRent,
                backgroundColor: "rgba(75, 192, 192, 0.7)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Ümumi sahə (kv.m)",
                data: totalArea,
                backgroundColor: "rgba(255, 206, 86, 0.7)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Boş sahə (kv.m)",
                data: areaEmpty,
                backgroundColor: "rgba(255, 159, 64, 0.7)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Kirayə verilən sahə (kv.m)",
                data: areaForRent,
                backgroundColor: "rgba(75, 190, 130, 0.7)",
                borderColor: "rgba(75, 190, 130, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
        ],
    };

    return (
        <div className='bar-chart'>
            <Bar data={allData} options={allOptions} height={"30px"} width={"100%"} />
        </div>
    );
};

export default AllBuildingsChart;

const allOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "Bütün binalar üzrə otaq və sahə statistikası",
        },
        tooltip: {
            mode: "index" as const,
            intersect: false,
        },
        legend: {
            position: "top" as const,
            labels: {
                font: {
                    weight: "bold",
                },
            } as const,
        },
    },
    scales: {
        x: {
            stacked: true,
            title: {
                display: true,
                text: "Binalar",
                font: { size: 18, weight: "bold" },
            } as const,
        },
        y: {
            stacked: true,
            title: {
                display: true,
                text: "Sayı və sahəsi (kv.m)",
                font: { size: 18, weight: "bold" } as const,
            },
        },
    },
};
