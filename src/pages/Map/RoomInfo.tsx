import { TRoomDetails } from "@/service/RoomsService";
import { List } from "antd";
import { FC } from "react";

function RoomInfo({
    price_per_square_meter = 0,
    area = 0,
    renter_name = "",
    contract = { number: "", id: "", created_at: "", updated_at: "" },
    debt = 0,
    director = "",
    official_payment = 0,
    rent_amount = 0,
    type = "",
    total_debt = 0,
    voen_or_fin = "",
    unofficial_payment = 0,
    number = "",
}: TRoomDetails) {
    const groupedDataSource = [
        {
            group: "Otaq məlumatları",
            items: [
                { title: "Otaq nömrəsi", count: number },
                { title: "Müəsisə", count: renter_name },
                { title: "Dirktor", count: director },
                { title: "Sahə (kv.m)", count: area },
                { title: "Otaq növü", count: type },
            ],
        },
        {
            group: "Ödəniş məlumatları",
            items: [
                { title: "1 (kv.m)", count: Number(price_per_square_meter).toFixed(2) + " AZN" },
                { title: "Ümumi dəyəri", count: Number(rent_amount).toFixed(2) + " AZN" },
                { title: "Borc", count: Number(debt).toFixed(2) + " AZN" },
                { title: "Ümumi borc", count: Number(total_debt).toFixed(2) + " AZN" },
                { title: "Rəsmi ödəniş", count: Number(official_payment).toFixed(2) + " AZN" },
                { title: "Q-rəsmi ödəniş", count: Number(unofficial_payment).toFixed(2) + " AZN" },
                { title: "Ümumi ödəniş", count: (Number(official_payment) + Number(unofficial_payment)).toFixed(2) + " AZN" },
            ],
        },
        {
            group: "Müqavilə məlumatları",
            items: [
                { title: "VÖEN | FİN", count: voen_or_fin },
                { title: "Müqavilə nömrəsi", count: contract?.number },
            ],
        },
    ];

    return <GroupedList groupedDataSource={groupedDataSource} />;
}

export default RoomInfo;

export const GroupedList: FC<{ groupedDataSource: GroupedListProps[] }> = ({ groupedDataSource }) => (
    <div>
        {groupedDataSource.map((group, groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: "20px" }}>
                <h4>{group.group}</h4>

                <List
                    dataSource={group.items}
                    renderItem={(item) => (
                        <List.Item>
                            {item.title}: <b>{item.count}</b>
                        </List.Item>
                    )}
                />
            </div>
        ))}
    </div>
);

type GroupedListProps = {
    group: string;
    items: {
        title: string;
        count: string | number | null;
    }[];
};
