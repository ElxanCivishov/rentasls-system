import { TStatistics } from "@/service/StatisticsService";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import "./Statistics.scss";
import StatisticsTextList from "./StatisticsList";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BuildingChart: React.FC<{ statistics?: TStatistics }> = ({ statistics }) => {
    if (!statistics) {
        return <div>statistics məlumatları tapılmadı</div>;
    }

    const labels = statistics.floors?.map((floor) => floor.floor_name);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Otaq sayı",
                data: statistics?.floors?.map((floor) => floor.total_number_of_rooms),
                backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Boş otaqlar",
                data: statistics?.floors?.map((floor) => floor.number_of_empty_rooms),
                backgroundColor: "rgba(255, 99, 132, 0.8)", // Red
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Kirayə verilən otaqlar",
                data: statistics?.floors?.map((floor) => floor.number_of_rooms_for_rent),
                backgroundColor: "rgba(75, 192, 192, 0.8)", // Teal
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                stack: "Stack 0",
            },
            {
                label: "Ümumi sahə (kv.m)",
                data: statistics?.floors?.map((floor) => floor.total_area_of_rooms),
                backgroundColor: "rgba(255, 206, 86, 0.8)", // Yellow
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Boş sahə (kv.m)",
                data: statistics?.floors?.map((floor) => floor.area_of_empty_rooms),
                backgroundColor: "rgba(153, 102, 255, 0.8)", // Purple
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Kirayə verilən sahə (kv.m)",
                data: statistics?.floors?.map((floor) => floor.area_of_rooms_for_rent),
                backgroundColor: "rgba(75, 190, 130, 0.8)", // Light Green
                borderColor: "rgba(75, 190, 130, 1)",
                borderWidth: 1,
                stack: "Stack 1",
            },
            {
                label: "Borc",
                data: statistics?.floors?.map((floor) => floor.total_cost_of_rent),
                backgroundColor: "rgba(220, 20, 60, 0.8)", // Crimson Red
                borderColor: "rgba(220, 20, 60, 1)", // Crimson
                borderWidth: 1,
                stack: "Stack 2",
            },
            {
                label: "Rəsmi ödəniş",
                data: statistics?.floors?.map((floor) => floor.total_official_payment),
                backgroundColor: "rgba(0, 128, 128, 0.8)",
                borderColor: "rgba(0, 128, 128, 1)",
                borderWidth: 1,
                stack: "Stack 2",
            },
            {
                label: "Qeyri-rəsmi ödəniş",
                data: statistics?.floors?.map((floor) => floor.total_unofficial_payment),
                backgroundColor: "rgba(201, 203, 207, 0.8)", // Light Grey
                borderColor: "rgba(201, 203, 207, 1)",
                borderWidth: 1,
                stack: "Stack 2",
            },
        ],
    };

    return (
        <div className='statistics-wrapper'>
            <div className='bar-chart-wrapper'>
                <div className='bar-chart'>
                    <Bar data={data} options={getOptions(statistics)} />
                </div>
            </div>
            <StatisticsTextList {...statistics} />
        </div>
    );
};

export default BuildingChart;

const getOptions = (buildingData: TStatistics) => {
    return {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${buildingData.building_name} - mərtəbələr üzrə otaq və sahə statistikası`,
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
