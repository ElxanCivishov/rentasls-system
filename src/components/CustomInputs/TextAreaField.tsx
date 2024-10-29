import { ExtendedInputDetails, TValidatorProps } from "@/components/FormBuilder";
import { Flex, Input, InputProps } from "antd";
import { TextAreaProps } from "antd/lib/input";
import { valueType } from "antd/lib/statistic/utils";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

type TextAreaFieldDetails = Omit<ExtendedInputDetails, "type"> & TValidatorProps;
type TextAreaFieldProps = { inputDetails: TextAreaFieldDetails } & TextAreaProps;

export const CustomTextAreaField: FC<TextAreaFieldProps> = function ({ inputDetails, ...rest }) {
    const { TextArea } = Input;
    const [inputStatus, setInputStatus] = useState<InputProps["status"]>("");
    const { checkValidate, label, field, required, disabled, resetForm, errorMessage, value, maxLength } = inputDetails;

    useEffect(() => {
        if (checkValidate) handleShowErrorAndSetInputStatus(inputDetails, setInputStatus);
        // eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => setInputStatus(""), [resetForm]);

    const fieldMessage = field || label ? `${field ?? label} daxil edilməlidir.` : "";
    const textareaFieldErrorMessage = errorMessage ?? fieldMessage;

    return (
        <Flex vertical>
            {label && (
                <h3 className='textarea-title'>
                    {label} {required && <span className='required-star'>*</span>}
                </h3>
            )}
            <TextArea
                disabled={disabled}
                value={value as valueType}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    inputDetails.onChange({ key: inputDetails.key, value: event.target.value });
                    handleShowErrorAndSetInputStatus({ ...inputDetails, value, informUser: false }, setInputStatus);
                }}
                onBlur={() => handleShowErrorAndSetInputStatus({ ...inputDetails, informUser: false }, setInputStatus)}
                showCount
                maxLength={maxLength}
                style={{ resize: "none", height: "100px" }}
                status={inputStatus}
                rows={5}
                {...rest}
            />
            {inputStatus && textareaFieldErrorMessage && <span className='error-message field-error'>{textareaFieldErrorMessage}</span>}
        </Flex>
    );
};

const handleShowErrorAndSetInputStatus = (inputDetails: TextAreaFieldDetails, setInputStatus: Dispatch<SetStateAction<InputProps["status"]>>) => {
    const { label, field, maxLength, informUser, value, setIsValid, key } = inputDetails;

    const errorMessage = field || label ? `"${field ?? label}" xanasını daxil edin.` : "Xananı daxil edin";

    const isInValid = !value || (maxLength && value.length > maxLength);

    if (isInValid) {
        informUser && toast.error(errorMessage);
        setIsValid?.({ key, isValid: false });
        setInputStatus("error");
        return false;
    } else {
        setIsValid?.({ key, isValid: true });
        setInputStatus("");
        return true;
    }
};
