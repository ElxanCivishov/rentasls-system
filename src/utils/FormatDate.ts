import dayjs, { Dayjs } from "dayjs";

export const DB_DATE_FORMAT = "YYYY-MM-DD";
export const SHOW_DATE_FORMAT = "DD.MM.YYYY";
export const SHOW_DATE_FORMAT_AND_TIME = "DD.MM.YYYY HH:mm:ss";

/**
 * Formats a given date into a string based on the specified format.
 * @param {Date | Dayjs | string | null} [date] - The date to format.
 * @param {string} [format=DB_DATE_FORMAT] - The format string to use for formatting the date. Defaults to `DB_DATE_FORMAT`,
 * @returns {string} The formatted date string.
 */

export function formatDate({ date, format = DB_DATE_FORMAT }: { date?: Date | Dayjs | string | null; format?: string }): string {
    if (!date) return "";

    return dayjs(date).format(format);
}

/**
 * Formats a given date into a string based on the specified format.
 * @param {Date | Dayjs | string | null} [date] - The date to format.
 * @returns {string | Dayjs} The formatted date Dayjs | string.
 */

export function formatToDayjs(date?: Date | Dayjs | string | null): string | Dayjs {
    if (!date) return "";

    return dayjs(date);
}
