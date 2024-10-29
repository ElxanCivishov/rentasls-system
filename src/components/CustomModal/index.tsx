import { Modal, ModalProps, Spin } from "antd";
import { FC } from "react";
import "./CustomModal.scss";

type CustomModalProps = {
    children: JSX.Element | JSX.Element[];
    isLoading?: boolean;
} & ModalProps;

const CustomModal: FC<CustomModalProps> = ({ children, className, isLoading, ...rest }) => {
    return (
        <Modal
            className={`custom-modal ${className}`}
            centered
            width={700}
            cancelButtonProps={{ className: "cancel-btn" }}
            okButtonProps={{ className: "ok-btn" }}
            cancelText='Bağla'
            okText='Yadda saxla'
            {...rest}
        >
            {isLoading ? (
                <div className='loading align-center'>
                    <Spin size='large'></Spin>
                </div>
            ) : (
                children
            )}
        </Modal>
    );
};

export default CustomModal;
