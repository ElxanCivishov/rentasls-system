/**
 * Checks if a value is considered "empty".
 * @param {any} value - The value to check for emptiness.
 * @returns {boolean} Returns `true` if the value is empty; otherwise, `false`.
 */

export function isEmpty(value: any): boolean {
    if (value === null || value === undefined || value === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
}

/**
 * Removes properties from an object that have "empty" values.
 * @template T - The type of the input object.
 * @param {T} obj - The object to clean by removing empty values.
 * @returns {Partial<T>} A new object with all empty values removed.
 */

export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const result = { ...obj };

    for (const key in result) {
        if (isEmpty(result[key])) {
            delete result[key];
        }
    }

    return result;
}
