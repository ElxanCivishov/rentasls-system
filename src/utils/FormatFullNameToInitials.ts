/**
 * Generates initials from a given name and surname, extracts the first character.
 * @param {Object} params - The input object containing name and surname.
 * @param {string} params.name - The first name of the individual.
 * @param {string} params.surname - The surname of the individual.
 *
 * @returns {string} The initials, with the first letter of the surname and name capitalized.
 */

export function formatFullNameToInitials({ name }: { name: string }) {
    const initials = name?.split(" ");
    return initials.map((initial) => initial.charAt(0).toUpperCase()).join("");
}
