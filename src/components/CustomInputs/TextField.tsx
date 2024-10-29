import { FloatLabel } from "@/components/FloatingLabel";
import { ExtendedInputDetails } from "@/components/FormBuilder";
import { EmailValidator, LengthValidator, NumberValidator, PasswordValidator, PinValidator, TNumberValidator, Validator } from "@/utils/Validator";
import { Input, InputNumber, InputProps, InputRef } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { InputProps as AntInputProps } from "antd/lib";
import { Dispatch, FC, RefAttributes, SetStateAction, useEffect, useState } from "react";

export const CustomTextField: FC<TextFieldProps> = function ({ inputDetails, ...buildIndInputProps }) {
    const [inputStatus, setInputStatus] = useState<InputProps["status"]>("");
    const { checkValidate, label, field, required, disabled, resetForm, errorMessage, value, specificText, key, type, maxLength, isOnlyNumber } =
        inputDetails;
    const isNumberInput = type === "number";

    useEffect(() => {
        if (checkValidate) {
            handleShowErrorAndSetInputStatus(inputDetails, setInputStatus);
        }
        //eslint-disable-next-line
    }, [checkValidate]);

    useEffect(() => {
        setInputStatus("");
    }, [resetForm]);

    const handleInputChange = (e: any) => {
        const newValue: valueType | undefined = isNumberInput ? e : e.target.value;
        inputDetails.onChange({ key, value: newValue });
        handleShowErrorAndSetInputStatus({ ...inputDetails, value: newValue, informUser: false }, setInputStatus);
    };

    const inputProps = {
        style: { paddingRight: specificText ? "3rem" : "" },
        disabled,
        status: inputStatus,
        onChange: handleInputChange,
        onBlur: () => handleShowErrorAndSetInputStatus({ ...inputDetails, informUser: false }, setInputStatus),
        maxLength,
        value,
    };

    const handleIgnoreStringValue = (event: any) => {
        if (isNumberInput) {
            // Allow numbers and a single dot
            if (!/[0-9.]$/.test(event.key) && event.charCode !== 13) {
                event.preventDefault();
            }

            // Prevent multiple dots
            if (event.key === "." && event.target.value.includes(".")) {
                event.preventDefault();
            }
        } else if (!/\d/.test(event.key) && event.charCode !== 13) {
            event.preventDefault();
        }
    };

    const fieldMessage = field || label ? `${field ?? label} daxil edilməlidir.` : "";
    const textFieldErrorMessage = value?.length > 0 ? errorMessage : fieldMessage;

    return (
        <FloatLabel className={buildIndInputProps.status} label={label} value={value} specificText={specificText} isRequired={required}>
            <>
                {isNumberInput ? (
                    <InputNumber inputMode='decimal' {...inputProps} controls={false} onKeyDown={handleIgnoreStringValue} name={key} />
                ) : (
                    <Input {...inputProps} {...buildIndInputProps} {...(isOnlyNumber && { onKeyPress: handleIgnoreStringValue })} name={key} />
                )}
                {inputStatus && textFieldErrorMessage && <span className='error-message field-error'>{textFieldErrorMessage}</span>}
            </>
        </FloatLabel>
    );
};

const handleShowErrorAndSetInputStatus = (inputDetails: ExtendedInputDetails, setInputStatus: Dispatch<SetStateAction<InputProps["status"]>>) => {
    const { label, field, required, value, setIsValid, key, validator, valueType } = inputDetails;
    if (!required) return;
    const isValid = handleValidation({
        input: value,
        validatorType: validator,
        field: field ?? label,
        inputType: valueType,
        ...inputDetails,
    });

    setInputStatus(!isValid ? "error" : "");
    setIsValid?.({ key, isValid });
    return isValid;
};

const handleValidation = ({ input, validatorType, inputType, ...rest }: THandleValidation): boolean => {
    if (!validatorType || validatorType === "isTypeValid") {
        const isInputType = inputType ?? "string";

        const isValid = Validator.isTypeValid(input, isInputType, rest.informUser, rest.field);
        return isValid;
    } else if (validatorType === "NumberValidator") {
        const isValid = NumberValidator.validate({ input, ...rest });
        return isValid;
    } else if (validatorType === "LengthValidator") {
        const isValid = LengthValidator.validate({ input, ...rest });
        return isValid;
    }

    const checkValidator = validators[validatorType as keyof typeof validators];
    const isValid = checkValidator.validate(String(input), rest.informUser || false);
    return isValid;
};

type TextFieldProps = AntInputProps & RefAttributes<InputRef> & { inputDetails: ExtendedInputDetails };

type SpecificValidatorType = "PinValidator" | "PasswordValidator" | "NumberValidator" | "EmailValidator" | "LengthValidator";
export type ValidatorType = SpecificValidatorType | "isTypeValid";

interface IValidator<T> {
    validate: (value: T, informUser: boolean) => boolean;
}

const validators: Record<SpecificValidatorType, IValidator<any>> = {
    PinValidator: PinValidator,
    PasswordValidator: PasswordValidator,
    NumberValidator: NumberValidator,
    EmailValidator: EmailValidator,
    LengthValidator: LengthValidator,
};

type THandleValidation = {
    validatorType?: ValidatorType;
    inputType?: string;
} & TNumberValidator;
