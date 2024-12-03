import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { ButtonProps } from "antd/lib";
import { FC } from "react";
import "./Buttons.scss";

export const SearchButton: FC<ButtonProps> = function ({ loading, ...rest }) {
    const determineIcon = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "blue" }} spin />} /> : <img src={SearchIcon} />;

    return <Button className='search-button' {...rest} type='primary' icon={determineIcon} />;
};
