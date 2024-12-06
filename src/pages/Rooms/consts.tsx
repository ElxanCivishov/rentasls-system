import { EditIcon } from "@/assets/icons";
import { FormDetails } from "@/components/FormBuilder";
import { TRoomDetails } from "@/service/RoomsService";
import { formatDate, SHOW_DATE_FORMAT_AND_TIME } from "@/utils/FormatDate";
import { Button } from "antd";
import { ColumnType } from "antd/lib/table";
import { RoomDetailsModalActions } from ".";

export const operationsColumns = ({
    handleOpen,
    deleteRoom,
}: {
    handleOpen: (key: RoomDetailsModalActions, data?: null | TRoomDetails) => void;
    deleteRoom: (id: string) => void;
}): ColumnType<TRoomDetails>[] => [
    {
        title: "Nömrə",
        dataIndex: "number",
        key: "number",
        align: "center",
    },
    {
        title: "SVG uuid",
        dataIndex: "key_for_svg",
        key: "key_for_svg",
        align: "center",
    },
    {
        title: "Müəsisə",
        dataIndex: "renter_name",
        key: "renter_name",
        align: "center",
    },
    {
        title: "Direktor",
        dataIndex: "director",
        key: "director",
        align: "center",
    },
    {
        title: "Telefon",
        dataIndex: "renter_phone",
        key: "renter_phone",
        align: "center",
    },
    {
        title: "Sahə m²",
        dataIndex: "area",
        key: "area",
        align: "center",
        width: "60px",
    },
    {
        title: "1 m² dəyəri",
        dataIndex: "price_per_square_meter",
        key: "price_per_square_meter",
        align: "center",
        width: "60px",
    },
    // {
    //     title: "İcra dəyəri",
    //     dataIndex: "rent_amount",
    //     key: "rent_amount",
    //     align: "center",
    //     width: "60px",
    // },
    // {
    //     title: "Borc",
    //     dataIndex: "debt",
    //     key: "debt",
    //     align: "center",
    //     width: "60px",
    // },
    // {
    //     title: "Ümumi borc",
    //     dataIndex: "total_debt",
    //     key: "total_debt",
    //     align: "center",
    //     width: "60px",
    // },
    // {
    //     title: "Rəsmi ödəniş",
    //     dataIndex: "official_payment",
    //     key: "official_payment",
    //     align: "center",
    //     width: "60px",
    // },
    // {
    //     title: "Q/rəsmi ödəniş",
    //     dataIndex: "unofficial_payment",
    //     key: "unofficial_payment",
    //     align: "center",
    //     width: "60px",
    // },
    {
        title: "VÖEN/FIN",
        dataIndex: "voen_or_fin",
        key: "voen_or_fin",
        align: "center",
    },
    {
        title: "Kontrakt",
        dataIndex: "contract",
        key: "contract",
        align: "center",
        render: (_, { contract }) => contract?.number,
    },
    {
        title: "Akt",
        dataIndex: "handover",
        key: "handover",
        align: "center",
        render: (_, { handover }) => handover?.number,
    },
    {
        title: "Məkan növü",
        dataIndex: "type",
        key: "type",
        align: "center",
    },
    {
        title: "Vəziyyət",
        dataIndex: "status",
        key: "status",
        align: "center",
    },
    {
        title: "Təyinat",
        dataIndex: "destination",
        key: "destination",
        align: "center",
    },
    {
        title: "Yenilənmə/T",
        dataIndex: "updated_at",
        key: "updated_at",
        align: "center",
        render: (_, { updated_at }) => formatDate({ date: updated_at, format: SHOW_DATE_FORMAT_AND_TIME }),
    },
    {
        title: " ",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => (
            <div className='flex gap-1'>
                <button onClick={() => handleOpen("edit", record)}>
                    <EditIcon className='pointer' />
                </button>

                <Button type='primary' onClick={() => deleteRoom(record.id)}>
                    sil
                </Button>
            </div>
        ),
    },
];

export const searchFormFields: FormDetails[] = [
    { label: "Mərtəbə", type: "select", key: "floor_id" },
    { label: "İl", type: "select", key: "year" },
    { label: "Ay", type: "select", key: "month" },
    { label: "Nömrə", type: "text", key: "number" },
    { label: "Müəsisə", type: "text", key: "renter_name" },
    { label: "Director", type: "text", key: "director" },
];
