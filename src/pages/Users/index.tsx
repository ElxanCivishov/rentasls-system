import { CustomTable } from "@/components/CustomTable";
import { useModalActions } from "@/hooks/useModalActions";
import { TUser, UserService } from "@/service/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./consts";
import UserDetailsModal from "./UserDetails";
import "./Users.scss";
import { Button } from "antd";

const Users = () => {
    const { modalState, handleClose, handleOpen } = useModalActions<userModalActions, TUser>();
    const queryClient = useQueryClient();
    const { data = { data: [] }, isLoading } = useQuery({
        queryKey: ["users-list"],
        queryFn: async () => {
            const response = await UserService.getAll();
            return response;
        },
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => {
            return UserService.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users-list"] });
        },
    });

    return (
        <div className='users'>
            <div className='self-end'>
                <Button onClick={() => handleOpen("new")}>Yeni İstifadəçi</Button>
            </div>
            <CustomTable
                loading={isLoading}
                columns={columns({ handleOpen, handleDelete: (id: string) => mutate(id) })}
                data={data.data}
                pagination={false}
            />
            <UserDetailsModal modalState={modalState} handleClose={handleClose} />
        </div>
    );
};

export default Users;

export type userModalActions = "new" | "edit" | null;
