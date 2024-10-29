import { ArrowIcon } from "@/assets/icons";
import { ExtendedInputDetails, InputValue } from "@/components/FormBuilder";
import { Checkbox, Select, SelectProps, Space } from "antd";
import { InputProps } from "antd/lib";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CustomSelectFieldMultiple = function ({ inputDetails, ...rest }: CustomSelectFieldMultipleProps) {
    const [selectStatus, setSelectStatus] = useState<InputProps["status"]>("");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const { checkValidate, label, field, required, disabled, resetForm, errorMessage, key, options } = inputDetails;

    useEffect(() => {
        if (checkValidate) handleShowErrorAndSetInputStatus(inputDetails, setSelectStatus);
        // eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => setSelectStatus(""), [resetForm]);

    const fieldMessage = field || label ? `${field ?? label} seçilməlidir.` : "";
    const selectErrorMessage = errorMessage ?? fieldMessage;

    return (
        <div className='flex-column'>
            {label && (
                <h3 className='h3'>
                    {label} {required && <span className='required-star'>*</span>}
                </h3>
            )}
            <Select
                loading={!options?.length}
                {...inputDetails}
                aria-required={required}
                onChange={(value) => {
                    inputDetails.onChange({ key, value });
                    handleShowErrorAndSetInputStatus({ ...inputDetails, value, informUser: false }, setSelectStatus);
                }}
                onDeselect={(value) => {
                    inputDetails.onDeselect?.({ key, value });
                    handleShowErrorAndSetInputStatus({ ...inputDetails, value, informUser: false }, setSelectStatus);
                }}
                onBlur={() => handleShowErrorAndSetInputStatus({ ...inputDetails, informUser: false }, setSelectStatus)}
                status={selectStatus}
                suffixIcon={<ArrowIcon className={dropdownOpen ? "rotateY-90" : ""} />}
                onDropdownVisibleChange={(open) => setDropdownOpen(open)}
                optionRender={(option) => (
                    <Space>
                        {option.data.isChecked && <Checkbox checked={option.data.checkedValue} />}
                        {option.data.label}
                    </Space>
                )}
                disabled={disabled}
                className='w-full'
                mode='multiple'
                size='large'
                {...rest}
            />

            {selectStatus && selectErrorMessage && <span className='error-message field-error'>{selectErrorMessage}</span>}
        </div>
    );
};

const handleShowErrorAndSetInputStatus = (
    inputDetails: CustomSelectMultipleProps,
    setSelectStatus: Dispatch<SetStateAction<InputProps["status"]>>,
): boolean => {
    const { required, label, field, informUser, value = [], setIsValid, key } = inputDetails;

    if (!required) return true;

    const errorMessage = field || label ? `"${field ?? label}" seçilməlidir.` : "Seçilməlidir";

    if (value.length === 0) {
        informUser && toast.error(errorMessage);
        setIsValid?.({ key, isValid: false });
        setSelectStatus("error");
        return false;
    } else {
        setIsValid?.({ key, isValid: true });
        setSelectStatus("");
        return true;
    }
};

type multipleSelectType = {
    value?: string | number | null;
    label: ReactNode;
    key?: string | number;
    isChecked?: boolean;
    checkedValue?: boolean;
};

export type CustomSelectMultipleProps = Omit<ExtendedInputDetails, "type" | "defaultValue" | "value"> & {
    options: multipleSelectType[];
    defaultValue?: InputValue[];
    value?: InputValue[];
    onDeselect?: (details: { key: string; value: InputValue }) => void;
};

export type CustomSelectFieldMultipleProps = {
    inputDetails: CustomSelectMultipleProps;
} & SelectProps;
