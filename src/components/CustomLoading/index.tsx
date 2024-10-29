import { Spin } from "antd";
import "./Loading.scss";

export const Loading = function () {
    return (
        <div className='loading-wrapper'>
            <Spin size='large' style={{ color: "#3C7167" }}></Spin>
        </div>
    );
};

export const ContentLoading = function () {
    return (
        <div className='content-loading-wrapper'>
            <Spin size='large' style={{ color: "#3C7167" }}></Spin>
        </div>
    );
};
