import { TRoomDetails } from "@/service/RoomsService";
import { List } from "antd";
import { FC } from "react";

function RoomInfo({
    price_per_square_meter = 0,
    area = 0,
    renter_name = "",
    renter_phone = "",
    destination = "",
    status = "",
    contract = { number: "", id: "", created_at: "", updated_at: "", files: [] },
    debt = 0,
    director = "",
    official_payment = 0,
    rent_amount = 0,
    type = "",
    // total_debt = 0,
    voen_or_fin = "",
    unofficial_payment = 0,
    number = "",
    rental_dates = [],
}: Readonly<TRoomDetails>) {
    const groupedDataSource = [
        {
            group: "Otaq məlumatları",
            items: [
                { title: "Otaq nömrəsi", count: number },
                { title: "Müəsisə", count: renter_name ?? "Boş otaq" },
                { title: "Dirktor", count: director },
                { title: "Telefon", count: renter_phone },
                { title: "Status", count: status },
                { title: "Destination", count: destination },
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
                { title: "Rəsmi ödəniş", count: Number(official_payment).toFixed(2) + " AZN" },
                { title: "Q-rəsmi ödəniş", count: Number(unofficial_payment).toFixed(2) + " AZN" },
                { title: "Ümumi ödəniş", count: (Number(official_payment) + Number(unofficial_payment)).toFixed(2) + " AZN" },
            ],
        },
        {
            group: "Müqavilə məlumatları",
            items: [
                { title: "VÖEN | FİN", count: voen_or_fin },
                { title: "Müqavilə nömrəsi", className: "", count: contract?.number },
            ],
        },
        {
            group: "İcarədə olduğu aylar",
            items: rental_dates.map((date) => ({ title: "", count: date })),
        },
    ];

    return <GroupedList groupedDataSource={groupedDataSource} />;
}

export default RoomInfo;

export const GroupedList: FC<{ groupedDataSource: GroupedListProps[] }> = ({ groupedDataSource }) => (
    <div className='grouped-list'>
        {groupedDataSource.map((group) => (
            <div key={group.group} style={{ marginBottom: "20px" }}>
                <h4>{group.group}</h4>

                <List
                    dataSource={group.items}
                    renderItem={(item) => (
                        <List.Item>
                            {item.title ? `${item.title} : ` : ""} <b className={item?.className}>{item.count}</b>
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
        className?: string;
    }[];
};
