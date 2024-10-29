import { CustomDatePicker } from "@/components/CustomInputs/DatePicker";
import { CustomSelectField } from "@/components/CustomInputs/SelectInput";
import { CustomSwitchField } from "@/components/CustomInputs/SwitchField";
import { CustomTextAreaField } from "@/components/CustomInputs/TextAreaField";
import { CustomTextField, ValidatorType } from "@/components/CustomInputs/TextField";
import { InputProps } from "antd";
import { TextAreaProps } from "antd/lib/input";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import { HTMLProps } from "react";
import CustomRangeDatePicker, { TDateRangeValue } from "../CustomInputs/RangeDatePicker";
import { CustomReactQuillInput } from "../CustomInputs/ReactQuillInput";
import { CustomSelectFieldMultiple } from "../CustomInputs/SelectInputMultiple";

export const FormBuilder = function ({ form }: { form: DynamicFormDetails & { inputs: Array<FormDetails> } & InputProps & TextAreaProps }) {
    return (
        <>
            {form.inputs.map((inputDetails) => {
                if (inputDetails.type === "text" || inputDetails.type === "number") {
                    return (
                        <CustomTextField
                            type={inputDetails.type}
                            key={inputDetails.key}
                            max={inputDetails.max}
                            min={inputDetails.min}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: form.values[inputDetails.key],
                            }}
                        />
                    );
                } else if (inputDetails.type === "select") {
                    return (
                        <CustomSelectField
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: form.values[inputDetails.key],
                                options: form?.options[inputDetails.key],
                            }}
                        />
                    );
                } else if (inputDetails.type === "select-multiple") {
                    return (
                        <CustomSelectFieldMultiple
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                defaultValue: [],
                                value: form.values[inputDetails.key] as any,
                                options: form?.options[inputDetails.key] as any,
                            }}
                        />
                    );
                } else if (inputDetails.type === "date-picker") {
                    return (
                        <CustomDatePicker
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: isDayjs(form.values[inputDetails.key]) ? dayjs(form.values[inputDetails.key] as Dayjs) : null,
                            }}
                            disableFuture={inputDetails.disableFuture}
                            disablePast={inputDetails.disablePast}
                        />
                    );
                } else if (inputDetails.type === "date-range") {
                    return (
                        <CustomRangeDatePicker
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: form.values?.[inputDetails?.key] as TDateRangeValue,
                            }}
                        />
                    );
                } else if (inputDetails.type === "textarea") {
                    return (
                        <CustomTextAreaField
                            key={inputDetails.key}
                            inputDetails={{ ...inputDetails, onChange: form.onChange, value: form.values[inputDetails.key] }}
                        />
                    );
                } else if (inputDetails.type === "switch") {
                    return (
                        <CustomSwitchField
                            key={inputDetails.key}
                            inputDetails={{ ...inputDetails, onChange: form.onChange, value: form.values[inputDetails.key] }}
                        />
                    );
                } else if (inputDetails.type === "quill") {
                    return (
                        <CustomReactQuillInput
                            key={inputDetails.key}
                            placeholder={inputDetails.placeholder}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: form.values[inputDetails.key],
                            }}
                        />
                    );
                }
            })}
        </>
    );
};

export type ExtendedInputDetails<T = any> = { value: T; onChange: (details: { key: string; value: T | null }) => void } & FormDetails;

export type CustomSelectProps = Omit<ExtendedInputDetails, "type"> & { options: Array<{ value: InputValue; label: string; key?: string | number }> };

export type FormDetails = {
    label?: string;
    defaultValue?: string | number | boolean;
    key: string;
    type: InputType;
    required?: boolean;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number | null;
    min?: number;
    max?: number;
    length?: number | null;
    specificText?: string;
    isAdd?: boolean;
    props?: HTMLProps<HTMLDivElement>;
    isArray?: boolean;
    disableFuture?: boolean;
    disablePast?: boolean;
    isOnlyNumber?: boolean;
    placeholder?: string;
} & TValidatorProps;

export type TValidatorProps = {
    checkValidate?: boolean;
    errorMessage?: string;
    isHideErrorMessage?: boolean;
    validator?: ValidatorType;
    informUser?: boolean;
    valueType?: string;
    field?: string;
    setIsValid?: ({ key, isValid }: TInputValidation) => void;
    resetForm?: boolean;
};

export type TInputValidation = {
    isValid: boolean;
    key: string;
};

export type TInputChange = { key: string; value: InputValue };

export type DynamicFormDetails = {
    options: any;
    values: Record<string, InputValue>;
    onChange: (details: TInputChange) => void;
};

export type InputValue = string | number | null | Date | boolean | Dayjs | Array<any>;
export type InputType = "select" | "select-multiple" | "textarea" | "switch" | "text" | "number" | "date-picker" | "date-range" | "quill" | null;
