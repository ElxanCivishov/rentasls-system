import { FloatLabel } from "@/components/FloatingLabel";
import { CustomSelectProps, InputValue } from "@/components/FormBuilder";
import { Select, SelectProps } from "antd";
import { InputProps } from "antd/lib";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const { Option } = Select;

export const CustomSelectField = memo(({ inputDetails, ...rest }: CustomSelectFieldProps) => {
    const [selectStatus, setSelectStatus] = useState<InputProps["status"]>("");
    const [options, setOptions] = useState<OptionType>([]);
    const { checkValidate, label, field, required, disabled, isHideErrorMessage = false, resetForm = false, errorMessage, key, value } = inputDetails;

    useEffect(() => {
        setOptions(inputDetails.options);
    }, [inputDetails.options, value]);

    useEffect(() => {
        if (checkValidate) handleShowErrorAndSetInputStatus(inputDetails, setSelectStatus);
        //eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => setSelectStatus(""), [resetForm]);

    const onSearch = (value: string) => {
        const filteredOptions = inputDetails.options.filter((option) => {
            return (option?.label ?? "").toLowerCase().includes(value.toLowerCase());
        });

        setOptions(filteredOptions);
    };

    const fieldMessage = field || label ? `${field ?? label} seçilməlidir.` : "";
    const selectErrorMessage = isHideErrorMessage ? "" : errorMessage ?? fieldMessage;

    return (
        <FloatLabel label={label} value={value} isRequired={required}>
            <>
                <Select
                    optionFilterProp='children'
                    aria-required={required}
                    value={value}
                    onChange={(value) => {
                        inputDetails.onChange({ key, value });
                        handleShowErrorAndSetInputStatus({ ...inputDetails, value, informUser: false }, setSelectStatus);
                    }}
                    size='large'
                    className='select-input'
                    disabled={disabled}
                    onBlur={() => handleShowErrorAndSetInputStatus({ ...inputDetails, informUser: false }, setSelectStatus)}
                    status={selectStatus}
                    aria-multiline={true}
                    showSearch={false}
                    {...rest}
                    {...(rest.showSearch && { onSearch })}
                >
                    {options?.map((option) => (
                        <Option key={option?.key} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
                {selectStatus && selectErrorMessage && <span className='error-message field-error'>{selectErrorMessage}</span>}
            </>
        </FloatLabel>
    );
});

const handleShowErrorAndSetInputStatus = (inputDetails: CustomSelectProps, setSelectStatus: Dispatch<SetStateAction<InputProps["status"]>>) => {
    const { required, label, field, informUser, value, setIsValid, key } = inputDetails;

    if (!required) return true;

    const errorMessage = field || label ? `"${field ?? label}" seçilməlidir.` : "Seçilməlidir";

    if (!value) {
        informUser && toast.error(errorMessage);
        setIsValid?.({ key, isValid: false });
        setSelectStatus("error");
        return false;
    }

    setIsValid?.({ key, isValid: true });
    setSelectStatus("");
    return true;
};

export type CustomSelectFieldProps = {
    inputDetails: CustomSelectProps;
} & SelectProps;

export type OptionType = {
    value: InputValue;
    label: string;
    key?: string | number;
}[];
