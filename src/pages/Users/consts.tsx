import { EditIcon } from "@/assets/icons";
import { TUser } from "@/service/UserService";
import { Button } from "antd";
import { ColumnType } from "antd/lib/table";
import { userModalActions } from ".";

export const columns = ({
    handleOpen,
    handleDelete,
}: {
    handleOpen: (key: userModalActions, data?: TUser) => void;
    handleDelete: (id: string) => void;
}): ColumnType<TUser>[] => [
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center",
    },
    {
        title: "Ad",
        dataIndex: "name",
        key: "name",
        align: "center",
    },
    {
        title: "Rol",
        dataIndex: "roles",
        key: "roles",
        align: "center",
        render: (_, { roles }) => roles.map((role) => role.name).join(", "),
    },
    {
        title: " ",
        dataIndex: "actions",
        key: "actions",
        width: "80px",
        render: (_, record) => (
            <div className='flex gap-1'>
                <EditIcon className='pointer' onClick={() => handleOpen("edit", record)} />
                <Button type='primary' onClick={() => handleDelete(record.id)}>
                    Sil
                </Button>
            </div>
        ),
    },
];
