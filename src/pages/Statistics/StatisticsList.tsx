import { List } from "antd";

function StatisticsTextList({
    areaEmpty,
    totalArea,
    areaForRent,
    emptyRooms,
    roomsForRent,
    totalDebtAggregate,
    totalOfficialPayment,
    totalRooms,
    totalUnofficialPayment,
}: StatisticsListProps) {
    return (
        <List
            dataSource={[
                {
                    title: "Ümumi otaq sayı",
                    count: totalRooms,
                },
                {
                    title: "Boş otaq sayı",
                    count: emptyRooms,
                },
                {
                    title: "Kirayə verilən otaq sayı",
                    count: roomsForRent,
                },
                {
                    title: "Ümumi sahə (kv.m)",
                    count: totalArea,
                },
                {
                    title: "Boş sahə (kv.m)",
                    count: areaEmpty,
                },
                {
                    title: "Kirayə verilən sahə (kv.m)",
                    count: areaForRent,
                },
                {
                    title: "Cəmi borc",
                    count: totalDebtAggregate.toFixed(4) + " AZN",
                },
                {
                    title: "Rəsmi ödəniş",
                    count: totalOfficialPayment.toFixed(4) + " AZN",
                },
                {
                    title: "Q-rəsmi ödəniş",
                    count: totalUnofficialPayment.toFixed(4) + " AZN",
                },
                {
                    title: "Ümumi ödəniş",
                    count: (totalOfficialPayment + totalUnofficialPayment).toFixed(4) + " AZN",
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

export type StatisticsListProps = {
    totalRooms: number;
    emptyRooms: number;
    roomsForRent: number;
    totalArea: number;
    areaEmpty: number;
    areaForRent: number;
    totalOfficialPayment: number;
    totalUnofficialPayment: number;
    totalDebtAggregate: number;
};
