import { ExtendedInputDetails, TValidatorProps } from "@/components/FormBuilder";
import { SHOW_DATE_FORMAT } from "@/utils/FormatDate";
import { DateRangeValidator, DateRangeValidatorProps } from "@/utils/Validator";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import locale from "antd/es/date-picker/locale/az_AZ";
import { InputProps } from "antd/es/input";
import dayjs, { Dayjs } from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FloatLabel } from "../FloatingLabel";
import "./inputs.scss";

const { RangePicker } = DatePicker;

const CustomRangeDatePicker: React.FC<CustomDatePickerProps> = ({ inputDetails, disableFuture, disablePast, ...rest }) => {
    const [pickerStatus, setPickerStatus] = useState<InputProps["status"]>("");
    const { checkValidate, disabled, errorMessage, key, resetForm, value, required, label } = inputDetails;

    const dateValue: [Dayjs | null, Dayjs | null] = useMemo(() => {
        const initialValue = Array.isArray(value) ? value : [value, value];

        const startDate = initialValue[0] ? (dayjs.isDayjs(initialValue[0]) ? initialValue[0] : dayjs(initialValue[0])) : null;
        const endDate = initialValue[1] ? (dayjs.isDayjs(initialValue[1]) ? initialValue[1] : dayjs(initialValue[1])) : null;

        return [startDate, endDate];
    }, [value]);

    const isDateDisabled = (date: Dayjs) => {
        if (disableFuture) {
            return date.isAfter(dayjs().endOf("day"));
        }
        if (disablePast) {
            return date.isBefore(dayjs().startOf("day"));
        }
        return false;
    };

    useEffect(() => {
        if (checkValidate) handleShowErrorAndSetInputStatus(inputDetails, setPickerStatus, disableFuture, disablePast);
        // eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => setPickerStatus(""), [resetForm]);

    const errorMessagePlaceholder = rest.placeholder ? `${rest.placeholder} aralığı daxil edilməlidir.` : DEFAULT_MESSAGE;
    const customErrorMessage = errorMessage ?? DEFAULT_ERROR_MESSAGE;
    const datePickerErrorMessage = value && !dateValue ? customErrorMessage : errorMessagePlaceholder;

    const handleChange = (dates: [Dayjs | null, Dayjs | null]) => {
        inputDetails.onChange({
            key,
            value: dates,
        });

        handleShowErrorAndSetInputStatus({ ...inputDetails, value: dates, informUser: false }, setPickerStatus, disableFuture, disablePast);
    };

    return (
        <FloatLabel label={label} value={dateValue ? dateValue.map((d) => d?.format("DD/MM/YYYY")).join(" - ") : ""} isRequired={required}>
            <div className='date-picker-wrapper'>
                <RangePicker
                    value={dateValue ?? undefined}
                    onChange={handleChange as any}
                    locale={locale}
                    format={SHOW_DATE_FORMAT}
                    onBlur={() =>
                        handleShowErrorAndSetInputStatus(
                            { ...inputDetails, value: dateValue, informUser: false },
                            setPickerStatus,
                            disableFuture,
                            disablePast,
                        )
                    }
                    status={pickerStatus}
                    disabled={disabled}
                    allowClear={false}
                    placeholder={["Başlanğıc ", "Son tarix"]}
                    disabledDate={isDateDisabled}
                    {...rest}
                />
                {pickerStatus && datePickerErrorMessage && <span className='error-message date-error'>{datePickerErrorMessage}</span>}
            </div>
        </FloatLabel>
    );
};

export default CustomRangeDatePicker;

const handleShowErrorAndSetInputStatus = (
    inputDetails: datePickerDetails,
    setPickerStatus: Dispatch<SetStateAction<InputProps["status"]>>,
    disableFuture?: boolean,
    disablePast?: boolean,
    validatorOptions?: DateRangeValidatorProps,
) => {
    const { required, field, informUser, value, errorMessage, setIsValid, key } = inputDetails;

    if (!required) return true;

    const [startDate, endDate] = Array.isArray(value) ? value : [value, value];

    const isValid = DateRangeValidator.validateRange(
        startDate,
        endDate,
        {
            ...validatorOptions,
            informUser,
            minDate: disablePast ? dayjs().startOf("day") : validatorOptions?.minDate,
            maxDate: disableFuture ? dayjs().endOf("day") : validatorOptions?.maxDate,
            customErrorMessage: errorMessage,
        },
        field,
    );

    setPickerStatus(!isValid ? "error" : "");
    setIsValid?.({ key, isValid });
    return isValid;
};

const DEFAULT_ERROR_MESSAGE = "Tarix formatı düzgün daxil edilməyib.";
const DEFAULT_MESSAGE = "Tarix aralığı daxil edilməlidir.";

type TDateProps = Dayjs | string | null;

export type TDateRangeValue = [TDateProps, TDateProps];

type datePickerDetails = Omit<ExtendedInputDetails<TDateRangeValue>, "type"> & TValidatorProps;

export type CustomDatePickerProps = {
    inputDetails: datePickerDetails;
    disableFuture?: boolean;
    disablePast?: boolean;
} & RangePickerProps;
