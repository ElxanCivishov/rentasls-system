import PlusIcon from "@/assets/icons/Plus.svg";
import { FC, HTMLProps } from "react";

type AddNewRowButtonProps = {
    type?: "button" | "submit" | "reset";
} & HTMLProps<HTMLButtonElement>;

const AddNewRowButton: FC<AddNewRowButtonProps> = ({ children, height = 24, width = 24, type = "button", ...rest }) => {
    return (
        <button type={type} className='row-btn' {...rest}>
            <img style={{ width, height }} src={PlusIcon} alt='Plus Icon' />
            {children}
        </button>
    );
};

export default AddNewRowButton;
