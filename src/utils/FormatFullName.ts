import { TUser } from "@/service/UserService";

/**
 * Utility function to filter out empty or falsy values from an array of strings and concatenate them with a space.
 * @param {string[]} fields - An array of string fields.
 * @returns {string} A concatenated string of non-empty fields.
 */
function getFullNameFromFields(fields: string[]): string {
    return fields.filter(Boolean).join(" ");
}

/**
 * Generates the full name of a person by concatenating the name, surname, and patronymic fields.
 * @param {TUser} info - Object containing the individual's name, surname, and patronymic.
 * @returns {string} The full name of the person, concatenated from their name, surname, and patronymic.
 */
export function getFullName(info: TUser): string {
    const { name = "" } = info;
    return getFullNameFromFields([name]);
}
