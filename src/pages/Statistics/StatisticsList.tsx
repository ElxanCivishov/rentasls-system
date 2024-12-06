import { TStatistics } from "@/service/StatisticsService";
import { List } from "antd";

function StatisticsTextList({
    total_area_of_rooms = 0,
    area_of_empty_rooms = 0,
    area_of_rooms_for_rent = 0,
    number_of_empty_rooms = 0,
    number_of_rooms_for_rent = 0,
    total_number_of_rooms = 0,
    building_name,
    // total_cost_of_rent = 0,
    // total_debt = 0,
    // total_official_payment = 0,
    // total_unofficial_payment = 0,
}: TStatistics) {
    return (
        <List
            header={building_name}
            dataSource={[
                {
                    title: "Ümumi sahə (m²)",
                    count: total_area_of_rooms,
                },
                {
                    title: "Ümumi yer sayı",
                    count: total_number_of_rooms,
                },
                {
                    title: "Kirayə verilən sahə (m²)",
                    count: area_of_rooms_for_rent,
                },
                {
                    title: "Kirayə verilən yer sayı",
                    count: number_of_rooms_for_rent,
                },
                {
                    title: "Boş sahə (m²)",
                    count: area_of_empty_rooms,
                },
                {
                    title: "Boş yer sayı",
                    count: number_of_empty_rooms,
                },
               
                // {
                //     title: "Rəsmi ödəniş",
                //     count: total_official_payment.toFixed(4) + " AZN",
                // },
                // {
                //     title: "Q-rəsmi ödəniş",
                //     count: total_unofficial_payment.toFixed(4) + " AZN",
                // },
                // {
                //     title: "Ümumi ödəniş",
                //     count: total_cost_of_rent.toFixed(4) + " AZN",
                // },
                // {
                //     title: "Borc",
                //     count: total_debt.toFixed(4) + " AZN",
                // },
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
