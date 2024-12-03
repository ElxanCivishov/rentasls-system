import { Breadcrumb } from "@/components/Breadcrumb";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/routes/consts";
import AuthService from "@/service/AuthService";
import { TUser } from "@/service/UserService";
import { getFullName } from "@/utils/FormatFullName";
import { formatFullNameToInitials } from "@/utils/FormatFullNameToInitials";
import { Avatar, Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

export const Header = function () {
    const navigate = useNavigate();

    return (
        <header className='header'>
            <Breadcrumb />
            <Button onClick={() => navigate(ROUTES.SEARCH.LINK)}>Axtarış</Button>
            <UserInfoAndActions />
        </header>
    );
};

export const UserInfoAndActions = function () {
    const { user } = useUser();

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <button className='w-full align-center' onClick={() => AuthService.logout()}>
                    Çıxış
                </button>
            ),
        },
    ];

    return (
        <div className='header-right'>
            {user && (
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={["click"]}
                >
                    <button className='flex gap-half'>
                        <div className='user-info'>
                            <h3>{getFullName(user)}</h3>
                            <p>{user.email}</p>
                        </div>
                        <UserProfile user={user} />
                    </button>
                </Dropdown>
            )}
        </div>
    );
};

const UserProfile = ({ user }: { user?: TUser }) => {
    return <Avatar className='select-none avatar'>{user ? formatFullNameToInitials({ name: user.name }) : ""}</Avatar>;
};

export const VerticalDivider = function () {
    return <div className='vertical-line'></div>;
};
