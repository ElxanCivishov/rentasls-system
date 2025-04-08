import { Breadcrumb } from "@/components/Breadcrumb";
import { useUser } from "@/hooks/useUser";
import AuthService from "@/service/AuthService";
import { TUser } from "@/service/UserService";
import { getFullName } from "@/utils/FormatFullName";
import { formatFullNameToInitials } from "@/utils/FormatFullNameToInitials";
import { Avatar, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import "./Header.scss";
import Search from "./Search";
import { Link } from "react-router-dom";
import pdf from "./icare.pdf";

export const Header = function () {
    return (
        <>
            <header className='header'>
                <div className='flex gap-1 align-center'>
                    <Breadcrumb />

                    <div className='inner-search'>
                        <Search />
                    </div>
                </div>
                <UserInfoAndActions />
            </header>

            <div className='header-search'>
                <Search />
            </div>
        </>
    );
};

export const UserInfoAndActions = function () {
    const { user } = useUser();

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                    <Link to={pdf} target='_blank' rel='noopener noreferrer'>
                        İstifadəçi təlimatı
                    </Link>
            ),
        },
        {
            key: "2",
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
