import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import { SHOW_DATE_FORMAT } from "./FormatDate";

export type TNumberValidator = {
    input: number | null;
    field?: string;
    valueType?: string;
    informUser?: boolean;
    length?: number | null;
    maxLength?: number | null;
    minLength?: number | null;
};

export interface DateValidatorOptions {
    type?: string;
    informUser?: boolean;
    minDate?: dayjs.ConfigType;
    maxDate?: dayjs.ConfigType;
    customErrorMessage?: string;
}

export interface DateRangeValidatorProps {
    type?: "dayjs" | "string";
    informUser?: boolean;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    customErrorMessage?: string;
    customRule?: (startDate: Dayjs, endDate: Dayjs) => boolean;
    maxRangeDays?: number;
    minRangeDays?: number;
    invalidDateMessage?: string;
    rangeErrorMessage?: string;
}

export abstract class Validator {
    public static isTypeValid(input: any, type: string, informUser: boolean = false, field?: string): boolean {
        if (type === "dayjs" && dayjs.isDayjs(input)) {
            return true;
        }

        const fieldMessage = field ? `"${field}" xanasını daxil edin` : "Xananı daxil edin";

        if (String(input).length === 0) {
            informUser && toast.error(fieldMessage);
            return false;
        }

        if (typeof input === type) {
            return true;
        }

        const message = field ? `"${field}" xanasının tipi düzgün deyil` : "Tipi düzgün deyil";
        informUser && toast.error(!input ? fieldMessage : message);
        return false;
    }
}

export abstract class DateValidator {
    static validate(input: any, options: DateValidatorOptions = {}, field?: string): boolean {
        const { type = "dayjs", informUser = true, minDate, maxDate, customErrorMessage } = options;
        const fieldMessage = field ? `"${field}" xanasını daxil edin` : "Xananı daxil edin";

        const showError = (message: string) => {
            if (informUser) toast.error(customErrorMessage ?? message);
            return false;
        };

        if (!input) {
            return showError(fieldMessage);
        }

        if (type !== "dayjs" && !dayjs.isDayjs(input)) {
            return showError(fieldMessage);
        }

        if (minDate && dayjs(input).isBefore(minDate, "day")) {
            const errorMessage = `Tarix ${dayjs(minDate).format(SHOW_DATE_FORMAT)} tarixindən sonra olmalıdır.`;
            return showError(errorMessage);
        }

        if (maxDate && dayjs(input).isAfter(maxDate, "day")) {
            const errorMessage = `Tarix ${dayjs(maxDate).format(SHOW_DATE_FORMAT)} tarixindən əvvəl olmalıdır.`;
            return showError(errorMessage);
        }

        return true;
    }
}

export class EmailValidator extends Validator {
    static validate(input: string, informUser = true): boolean {
        const isTypeValid = super.isTypeValid(input, "string", informUser, "Elektron ünvan");
        if (!isTypeValid) return false;

        if (input.length === 0) {
            informUser && toast.error("Elektron ünvanı daxil edin");
            return false;
        }

        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.exec(input)) {
            informUser && toast.error("Elektron ünvanı düzgün daxil edin!");
            return false;
        }

        return true;
    }
}

export class PasswordValidator extends Validator {
    static validate(input: string, informUser = true): boolean {
        if (input.length === 0 && informUser) {
            informUser && toast.error("Şifrəni daxil edin");
            return false;
        }

        const minLengthRegex = /^.{8,}$/;
        if (!minLengthRegex.test(input)) {
            informUser && toast.error("Şifrə üçün minimal simvol sayı 8-dir");
            return false;
        }

        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(input)) {
            informUser && toast.error("Şifrə üçün minimum 1 böyük hərif yazmalısız");
            return false;
        }

        const symbolRegex = /[^A-Za-z0-9]/;
        if (!symbolRegex.test(input)) {
            informUser && toast.error("Şifrdə simvol istifadə edilməlidir");
            return false;
        }

        return true;
    }
}

export class PinValidator extends Validator {
    static validate(input: string | null, informUser = false): boolean {
        if (!super.isTypeValid(input, "string", informUser, "FİN")) return false;

        if (input?.length === 0) {
            informUser && toast.error(`"FİN" xanasını daxil edin!`);
            return false;
        }

        if (input && input.length > 7) {
            informUser && toast.error("FİN uzunluğu 7 simvol olmalıdır!");
            return false;
        }

        return true;
    }
}

export class SerialNumberValidator extends Validator {
    static validate(input: string | null, informUser: boolean = true): boolean {
        if (!super.isTypeValid(input, "string", informUser, "Seria nömrəsi")) return false;

        const inputValue = String(input);

        if (inputValue?.length > 8) {
            informUser && toast.error("Seria nömrəsinin uzunluğu max 8 simvol olmalıdır!");
            return false;
        }

        const validPinRegex = /^\d+$/;
        if (!validPinRegex.exec(inputValue)) {
            informUser && toast.error("Seria nömrəsi düzgün daxil edilməyib.", { duration: 10000 });
            return false;
        }

        return true;
    }
}

export class NumberValidator extends Validator {
    static validate({ input, field, informUser = true, length, maxLength, minLength }: TNumberValidator): boolean {
        if (!super.isTypeValid(input, "number", informUser, field)) return false;

        const inputValue = String(input);

        if (length && inputValue.length !== length) {
            informUser && toast.error(`${field ?? "Xana"} uzunluğu ${length} simvol olmalıdır!`);
            return false;
        }

        if (maxLength && inputValue.length > maxLength) {
            informUser && toast.error(`${field ?? "Xana"} uzunluğu max ${maxLength} simvol olmalıdır!`);
            return false;
        }

        if (minLength && inputValue.length < minLength) {
            informUser && toast.error(`${field ?? "Xana"} uzunluğu min ${minLength} simvol olmalıdır!`);
            return false;
        }

        const regex = /^\d+$/;

        if (!regex.exec(inputValue)) {
            toast.error(`${field} düzgün daxil edin!`);

            return false;
        }

        return true;
    }
}

export class LengthValidator extends Validator {
    static validate({ input, valueType, field, informUser = true, length, maxLength, minLength }: TNumberValidator): boolean {
        if (!super.isTypeValid(input, valueType ?? "string", informUser, field)) return false;

        const inputValue = String(input);

        if (length && inputValue.length !== length) {
            informUser && toast.error(`${field ?? "Xana"} uzunluğu ${length} simvol olmalıdır.`);
            return false;
        }

        if (maxLength && inputValue.length > maxLength) {
            informUser && toast.error(`${field ?? "Xana"} uzunluğu max ${maxLength} simvol ola bilər.`);
            return false;
        }

        if (minLength && inputValue.length < minLength) {
            informUser && toast.error(`${field ?? "Xana"} uzunluğu min ${minLength} simvol ola bilər.`);
            return false;
        }

        return true;
    }
}

export abstract class DateRangeValidator {
    public static validateRange(startDate: any, endDate: any, options: DateRangeValidatorProps = {}, field?: string): boolean {
        const { informUser = false, minDate, maxDate, customErrorMessage, customRule, maxRangeDays, minRangeDays, rangeErrorMessage } = options;
        const fieldMessage = field ? `"${field}" xanasını daxil edin` : "Xananı daxil edin";
        const invalidDateMessage = options.invalidDateMessage || "Seçilən tarixlər etibarlı deyil.";

        const showError = (message: string) => {
            if (informUser) toast.error(customErrorMessage ?? message);
            return false;
        };

        if (!startDate || !endDate) {
            return showError(fieldMessage);
        }

        const start = dayjs.isDayjs(startDate) ? startDate : dayjs(startDate);
        const end = dayjs.isDayjs(endDate) ? endDate : dayjs(endDate);

        if (!dayjs.isDayjs(start) || !dayjs.isDayjs(end)) {
            return showError(invalidDateMessage);
        }

        if (start.isAfter(end)) {
            const errorMessage = rangeErrorMessage || "Başlanğıc tarixi bitiş tarixindən əvvəl olmalıdır.";
            return showError(errorMessage);
        }

        if (minDate && start.isBefore(minDate, "day")) {
            const errorMessage = `Başlanğıc tarixi ${minDate.format(SHOW_DATE_FORMAT)} tarixindən sonra olmalıdır.`;
            return showError(errorMessage);
        }

        if (maxDate && end.isAfter(maxDate, "day")) {
            const errorMessage = `Bitiş tarixi ${maxDate.format(SHOW_DATE_FORMAT)} tarixindən əvvəl olmalıdır.`;
            return showError(errorMessage);
        }

        const rangeDays = end.diff(start, "day") + 1;

        if (maxRangeDays && rangeDays > maxRangeDays) {
            const errorMessage = `Seçilmiş aralıq ${maxRangeDays} gündən çox ola bilməz.`;
            return showError(errorMessage);
        }

        if (minRangeDays && rangeDays < minRangeDays) {
            const errorMessage = `Seçilmiş aralıq ən az ${minRangeDays} gün olmalıdır.`;
            return showError(errorMessage);
        }

        if (customRule && !customRule(start, end)) {
            return showError(customErrorMessage || "Seçilmiş tarixlər xüsusi qaydalara uyğun deyil.");
        }

        return true;
    }
}
