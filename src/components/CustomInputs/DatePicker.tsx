import { ExtendedInputDetails, TValidatorProps } from "@/components/FormBuilder";
import { SHOW_DATE_FORMAT } from "@/utils/FormatDate";
import { DateValidator } from "@/utils/Validator";
import { DatePicker } from "antd";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import locale from "antd/es/date-picker/locale/az_AZ";
import { InputProps } from "antd/lib";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import "dayjs/locale/az";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FloatLabel } from "../FloatingLabel";
import "./inputs.scss";

export const CustomDatePicker = function ({ inputDetails, disableFuture, disablePast, ...rest }: CustomDatePickerProps) {
    const [pickerStatus, setPickerStatus] = useState<InputProps["status"]>("");
    const { checkValidate, disabled, errorMessage, key, resetForm, value, required, label } = inputDetails;

    const dateValue = isDayjs(value) ? dayjs(value) : null;

    const isDateDisabled = function (date: Dayjs) {
        if (disableFuture) {
            return date > dayjs();
        }
        if (disablePast) {
            return date < dayjs();
        }

        return false;
    };

    useEffect(() => {
        if (checkValidate) handleShowErrorAndSetInputStatus(inputDetails, setPickerStatus, disableFuture, disablePast);
        // eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => setPickerStatus(""), [resetForm]);

    const errorMessagePlaceholder = rest.placeholder ? `${rest.placeholder} daxil edilməlidir.` : DEFAULT_MESSAGE;
    const customErrorMessage = errorMessage ?? DEFAULT_ERROR_MESSAGE;
    const datePickerErrorMessage = value && !dateValue ? customErrorMessage : errorMessagePlaceholder;

    return (
        <FloatLabel className={pickerStatus} label={label} value={dateValue?.format(SHOW_DATE_FORMAT)} isRequired={required}>
            <div className='date-picker-wrapper'>
                <DatePicker
                    value={dateValue}
                    disabled={disabled}
                    onChange={(value: Dayjs | null) => {
                        inputDetails.onChange({ key, value });
                        handleShowErrorAndSetInputStatus({ ...inputDetails, value, informUser: false }, setPickerStatus, disableFuture, disablePast);
                    }}
                    locale={locale}
                    disabledDate={isDateDisabled}
                    format={SHOW_DATE_FORMAT}
                    onBlur={() =>
                        handleShowErrorAndSetInputStatus({ ...inputDetails, informUser: false }, setPickerStatus, disableFuture, disablePast)
                    }
                    status={pickerStatus}
                    allowClear={false}
                    {...rest}
                    placeholder={label ? "" : rest.placeholder}
                />
                {pickerStatus && datePickerErrorMessage && <span className='error-message date-error'>{datePickerErrorMessage}</span>}
            </div>
        </FloatLabel>
    );
};

const handleShowErrorAndSetInputStatus = (
    inputDetails: datePickerDetails,
    setPickerStatus: Dispatch<SetStateAction<InputProps["status"]>>,
    disableFuture?: boolean,
    disablePast?: boolean,
) => {
    const { required, field, informUser, value, errorMessage, setIsValid, key } = inputDetails;

    if (!required) return true;

    const isValid = DateValidator.validate(
        value,
        {
            informUser,
            minDate: disablePast ? dayjs().startOf("day") : null,
            maxDate: disableFuture ? dayjs().endOf("day") : null,
            customErrorMessage: errorMessage,
        },
        field,
    );

    setPickerStatus(!isValid ? "error" : "");
    setIsValid?.({ key, isValid });
    return isValid;
};

type datePickerDetails = Omit<ExtendedInputDetails<Dayjs | string | null>, "type"> & TValidatorProps;

export type CustomDatePickerProps = {
    inputDetails: datePickerDetails;
    disableFuture?: boolean;
    disablePast?: boolean;
} & PickerProps<Dayjs>;

const DEFAULT_ERROR_MESSAGE = "Tarix formatı düzgün daxil edilməyib.";
const DEFAULT_MESSAGE = "Tarix daxil edilməlidir.";
