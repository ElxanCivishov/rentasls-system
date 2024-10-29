import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { buildings, TMockBuilding } from "../Buildings/consts";
import "./Statistics.scss";
import StatisticsTextList from "./StatisticsList";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BuildingChart: React.FC<{ keyword: string }> = ({ keyword }) => {
    const buildingData = buildings[0];

    if (!buildingData) {
        return <div>Açar sözə uyğun bina məlumatları tapılmadı: {keyword}</div>;
    }

    const labels = buildingData.statistics.map((floor) => floor.name);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Otaq sayı",
                data: buildingData.statistics.map((floor) => floor.countOfRooms),
                backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Boş otaqlar",
                data: buildingData.statistics.map((floor) => floor.emptyRooms),
                backgroundColor: "rgba(255, 99, 132, 0.8)", // Red
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Kirayə verilən otaqlar",
                data: buildingData.statistics.map((floor) => floor.countOfRoomsForRent),
                backgroundColor: "rgba(75, 192, 192, 0.8)", // Teal
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Ümumi sahə (kv.m)",
                data: buildingData.statistics.map((floor) => floor.totalArea),
                backgroundColor: "rgba(255, 206, 86, 0.8)", // Yellow
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Boş sahə (kv.m)",
                data: buildingData.statistics.map((floor) => floor.areaEmptyRooms),
                backgroundColor: "rgba(153, 102, 255, 0.8)", // Purple
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Kirayə verilən sahə (kv.m)",
                data: buildingData.statistics.map((floor) => floor.areaOfRoomsForRent),
                backgroundColor: "rgba(75, 190, 130, 0.8)", // Light Green
                borderColor: "rgba(75, 190, 130, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Ümumi borc",
                data: buildingData.statistics.map((floor) => floor.total_debt),
                backgroundColor: "rgba(255, 159, 64, 0.8)", // Orange
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
                stack: "Stack 2",
            },
            {
                label: "Rəsmi ödəniş",
                data: buildingData.statistics.map((floor) => floor.official_payment),
                backgroundColor: "rgba(255, 99, 71, 0.8)", // Tomato
                borderColor: "rgba(255, 99, 71, 1)",
                borderWidth: 1,
                stack: "Stack 2",
            },
            {
                label: "Qeyri-rəsmi ödəniş",
                data: buildingData.statistics.map((floor) => floor.unofficial_payment),
                backgroundColor: "rgba(201, 203, 207, 0.8)", // Light Grey
                borderColor: "rgba(201, 203, 207, 1)",
                borderWidth: 1,
                stack: "Stack 2",
            },
        ],
    };

    const totalStatistics = {
        totalRooms: buildingData.statistics.reduce((acc, floor) => acc + floor.countOfRooms, 0),
        emptyRooms: buildingData.statistics.reduce((acc, floor) => acc + floor.emptyRooms, 0),
        roomsForRent: buildingData.statistics.reduce((acc, floor) => acc + floor.countOfRoomsForRent, 0),
        totalArea: buildingData.statistics.reduce((acc, floor) => acc + floor.totalArea, 0),
        areaEmpty: buildingData.statistics.reduce((acc, floor) => acc + floor.areaEmptyRooms, 0),
        areaForRent: buildingData.statistics.reduce((acc, floor) => acc + floor.areaOfRoomsForRent, 0),
        totalOfficialPayment: buildingData.statistics.reduce((acc, floor) => acc + floor.official_payment, 0),
        totalUnofficialPayment: buildingData.statistics.reduce((acc, floor) => acc + floor.unofficial_payment, 0),
        totalDebtAggregate: buildingData.statistics.reduce((acc, floor) => acc + floor.total_debt, 0),
    };

    return (
        <div className='statistics-wrapper'>
            <div className='bar-chart-wrapper'>
                <div className='bar-chart'>
                    <Bar data={data} options={getOptions(buildingData)} />
                </div>
            </div>
            <StatisticsTextList {...totalStatistics} />
        </div>
    );
};

export default BuildingChart;

const getOptions = (buildingData: TMockBuilding) => {
    return {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${buildingData.name} - mərtəbələr üzrə otaq və sahə statistikası`,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            },
            legend: {
                position: "top" as const,
                labels: {
                    font: {
                        weight: "bold",
                    } as const,
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: "Mərtəbələr",
                    font: {
                        weight: "bold",
                    } as const,
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: "Sayı və sahəsi (kv.m)",
                    font: {
                        weight: "bold",
                    } as const,
                },
            },
        },
    };
};
