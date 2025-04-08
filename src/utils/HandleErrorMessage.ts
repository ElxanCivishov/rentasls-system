import { AxiosError } from "axios";
import toast, { ToastOptions } from "react-hot-toast";

/**
 * Utility function to extract the error message from an Axios error or a generic error object.
 * @param {AxiosError | any} error - The error object returned by Axios or a generic error.
 * @returns {string} - Extracted error message from the response or a generic error message.
 */
export const getErrorMessage = (error: AxiosError | any): string => {
    return error?.response?.data?.message || error?.response?.data?.error || error?.message;
};

/**
 * Asynchronous function to handle displaying error messages via react-hot-toast.
 * @param {AxiosError | any} error - The error object from Axios or a generic error.
 * @param {string} [fallbackMessage] - Optional fallback message to use if no error message is found.
 * @param {ToastOptions} [options] - Optional configuration options for the toast.
 *
 * @returns { errorMessage: string }
 */
export const handleErrorMessage = (error: AxiosError | any, fallbackMessage?: string, options?: ToastOptions): { errorMessage: string } => {
    const errorMessage = fallbackMessage || getErrorMessage(error);

    if (errorMessage) {
        toast.error(errorMessage, options);
    }

    return { errorMessage };
};
