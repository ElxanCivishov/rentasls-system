import { ExtendedInputDetails, TValidatorProps } from "@/components/FormBuilder";
import { Flex, InputProps } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

type ReactQuillInputDetails = Omit<ExtendedInputDetails, "type"> & TValidatorProps;
type ReactQuillInput = { inputDetails: ReactQuillInputDetails; theme?: string } & InputProps;

export const CustomReactQuillInput: FC<ReactQuillInput> = function ({ inputDetails, theme = "snow", placeholder = "daxil edin..." }) {
    const [inputStatus, setInputStatus] = useState<InputProps["status"]>("");
    const { checkValidate, label, field, key, required, resetForm, errorMessage, value, maxLength } = inputDetails;

    useEffect(() => {
        if (checkValidate) handleShowErrorAndSetInputStatus(inputDetails, setInputStatus);
        // eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => setInputStatus(""), [resetForm]);

    const valueCount = extractTextFromHTML(value)?.length as number;

    const checkCharacterCount = (event: any) => {
        if (valueCount >= Number(maxLength) && event.key !== "Backspace") event.preventDefault();
    };

    const formatMessage = errorMessage ?? DEFAULT_MESSAGE;
    const fieldMessage = field || label ? `${field ?? label} daxil edilməlidir.` : "";
    const maxLengthMessage = maxLength && valueCount > Number(maxLength) ? `Max ${maxLength} simvol ola bilər.` : "";
    const quillErrorMessage = maxLengthMessage ? maxLengthMessage : valueCount > 0 ? formatMessage : fieldMessage;

    return (
        <Flex vertical gap={8}>
            {label && (
                <h3 className='h3'>
                    {label} {required && <span className='required-star'>*</span>}
                </h3>
            )}
            <div>
                <ReactQuill
                    placeholder={placeholder}
                    theme={theme}
                    defaultValue=''
                    onKeyDown={checkCharacterCount}
                    className={`${inputStatus ? "quill-error" : ""}`}
                    value={value === "<p><br></p>" ? "" : value}
                    onChange={(val) => {
                        const newValue = val == "<p><br></p>" ? "" : val;
                        inputDetails.onChange({ key, value: newValue });
                        handleShowErrorAndSetInputStatus({ ...inputDetails, value: newValue, informUser: false }, setInputStatus);
                    }}
                    onBlur={() => handleShowErrorAndSetInputStatus({ ...inputDetails, informUser: false }, setInputStatus)}
                />
                <div className='quill-footer'>
                    <span className='error-message'>{inputStatus && quillErrorMessage && quillErrorMessage}</span>
                    {maxLength && <span className={inputStatus ? "error-message" : ""}>{`${valueCount ?? 0}/${maxLength}`}</span>}
                </div>
            </div>
        </Flex>
    );
};

function extractTextFromHTML(htmlString?: string) {
    return htmlString?.replace(/<[^>]*>/g, "");
}

const handleShowErrorAndSetInputStatus = (inputDetails: ReactQuillInputDetails, setInputStatus: Dispatch<SetStateAction<InputProps["status"]>>) => {
    const { required, label, field, maxLength, informUser, value, setIsValid, key } = inputDetails;

    if (!required) return;

    const strippedValue = extractTextFromHTML(value ?? inputDetails.value);
    const errorMessage = field || label ? `"${field ?? label}" xanasını daxil edin.` : "Xananı daxil edin";
    const isInValid = !strippedValue || (maxLength && strippedValue.length > maxLength);

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

const DEFAULT_MESSAGE = "Düzgün formada daxil edilməlidir.";
