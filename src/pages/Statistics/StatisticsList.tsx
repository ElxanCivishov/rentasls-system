import { TStatistics } from "@/service/StatisticsService";
import { List } from "antd";

function StatisticsTextList({
    total_area_of_rooms,
    area_of_empty_rooms,
    area_of_rooms_for_rent,
    number_of_empty_rooms,
    number_of_rooms_for_rent,
    total_cost_of_rent,
    total_debt,
    total_number_of_rooms,
    total_official_payment,
    total_unofficial_payment,
}: TStatistics) {
    return (
        <List
            dataSource={[
                {
                    title: "Ümumi otaq sayı",
                    count: total_number_of_rooms,
                },
                {
                    title: "Boş otaq sayı",
                    count: number_of_empty_rooms,
                },
                {
                    title: "Kirayə verilən otaq sayı",
                    count: number_of_rooms_for_rent,
                },
                {
                    title: "Ümumi sahə (kv.m)",
                    count: total_area_of_rooms,
                },
                {
                    title: "Boş sahə (kv.m)",
                    count: area_of_empty_rooms,
                },
                {
                    title: "Kirayə verilən sahə (kv.m)",
                    count: area_of_rooms_for_rent,
                },
                {
                    title: "Rəsmi ödəniş",
                    count: total_official_payment.toFixed(4) + " AZN",
                },
                {
                    title: "Q-rəsmi ödəniş",
                    count: total_unofficial_payment.toFixed(4) + " AZN",
                },
                {
                    title: "Ümumi ödəniş",
                    count: total_cost_of_rent.toFixed(4) + " AZN",
                },
                {
                    title: "Borc",
                    count: total_debt.toFixed(4) + " AZN",
                },
            ]}
            renderItem={(item) => (
                <List.Item>
                    {item.title}: <b>{item.count}</b>
                </List.Item>
            )}
        />
    );
}

export default StatisticsTextList;
