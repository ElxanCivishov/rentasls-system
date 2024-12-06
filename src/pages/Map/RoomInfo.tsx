import { TRoomDetails } from "@/service/RoomsService";
import { List } from "antd";
import { FC } from "react";

type GroupedListProps = {
    group: string;
    items: {
        title: string;
        count: string | number | null;
        className?: string;
    }[];
};

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

function RoomInfo({
    price_per_square_meter = 0,
    area = 0,
    destination,
    renter_phone,
    renter_name = "",
    contract = { number: "", id: "", created_at: "", updated_at: "", files: [] },
    handover = { number: "", id: "", created_at: "", updated_at: "", files: [] },
    floor = {
        building_name: "",
    },
    director = "",
    type = "",
    status = "",
    voen_or_fin = "",
    number = "",
    rental_dates = [],
}: Readonly<TRoomDetails>) {
    const groupedDataSource: GroupedListProps[] = [
        {
            group: "Məlumatlar",
            items: [
                { title: "Şirkət adı", count: floor?.building_name || "—" },
                { title: "Növü", count: type || "—" },
                { title: "Sahəsi (m²)", count: area || 0 },
                { title: "1 m² dəyəri", count: Number(price_per_square_meter).toFixed(2) + " AZN" },
                { title: "Təyinatı", count: destination || "—" },
                { title: "Nömrəsi", count: number || "—" },
                { title: "Müəsisə", count: renter_name || "Boşdur" },
                { title: "Direktor", count: director || "—" },
                { title: "Telefon", count: renter_phone || "—" },
                { title: "Vəziyyəti", count: status || "—" },
            ],
        },
        {
            group: "Müqavilə məlumatları",
            items: [
                { title: "VÖEN | FİN", count: voen_or_fin || "—" },
                { title: "Müqavilə nömrəsi", className: "", count: contract?.number || "—" },
                { title: "Təhvil-təslim aktı", className: "", count: handover?.number || "—" },
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
