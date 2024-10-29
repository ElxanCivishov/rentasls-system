import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { ROUTES } from "./routes/consts";
import { AuthService } from "./service/AuthService";
import { getErrorMessage } from "./utils/HandleErrorMessage";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
});

let abortControllers: { url: string; controller: AbortController }[] = [];

const onRequestError = (error: any) => {
    const errorMessage = error.response.data.message || error.response.data.error;
    if (errorMessage) toast.error(errorMessage);

    return Promise.reject(error);
};

const onRequest = async (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = AuthService.accessToken;

    if (accessToken && config && config.headers) {
        config.headers.Authorization = renderBearerToken(accessToken);
    }

    const existingController = abortControllers.find((item) => item.url === config.url);
    if (existingController) {
        existingController.controller.abort();
        abortControllers = abortControllers.filter((item) => item.url !== config.url);
    }

    const controller = new AbortController();
    config.signal = controller.signal;
    abortControllers.push({ url: config.url ?? "", controller });

    return config;
};

const showSuccessMessage = function (response: AxiosResponse) {
    const isGetRequest = response.config.method === "get";
    return !isGetRequest;
};

const onResponse = (response: AxiosResponse) => {
    if (showSuccessMessage(response)) {
        const successMessage = response.data.message;
        successMessage && toast.success(successMessage);
    }

    abortControllers = abortControllers.filter((item) => item.url !== response.config.url);

    return response;
};

const onResponseError = async (error: AxiosError<any>) => {
    const errorStatus = Number(error.response?.status);
    const serverErrorMessage = getErrorMessage(error);

    if (errorStatus === 401) {
        toast.error(serverErrorMessage || errorMessageByCode[401]);
        AuthService.clearTokens();
        window.location.href = ROUTES.AUTH.LOGIN.LINK;
        return Promise.reject(error);
    }

    if (axios.isCancel(error)) return Promise.reject(error);

    if (serverErrorMessage) {
        toast.error(serverErrorMessage);
        return;
    }

    if (errorStatus in errorMessageByCode) {
        const existingErrorMessage = (errorMessageByCode as Record<number, string>)[errorStatus];
        toast.error(existingErrorMessage);
        return;
    }

    toast.error("Xəta baş verdi");
};

const errorMessageByCode = {
    400: "400 Validasiya xətası",
    401: "401 Icazəsiz səlahiyyət",
    403: "403 Icazəniz yoxdur!",
    404: `404 Tapılmayib`,
    500: `500 Server xətası`,
    502: "502 Xidmət əlçatan deyil",
    503: "503 Xidmət mövcud deyil",
    504: "504 Vaxt aşımı",
};

const renderBearerToken = (token: string) => `Bearer ${token}`;

httpClient.interceptors.request.use(onRequest, onRequestError);
httpClient.interceptors.response.use(onResponse, onResponseError);
