import { httpClient } from "@/httpClient";
import { authKeywords } from "@/models/Consts";
import { TRolesKeyword } from "@/models/Roles";
import { ROUTES } from "@/routes/consts";
import { AxiosResponse } from "axios";

const { accessToken: tokenKeyword } = authKeywords;

export class AuthService {
    static async loginUser(loginData: LoginRequest): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await httpClient.post("/login", loginData);
        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem(tokenKeyword, token);
        }

        return response.data;
    }

    static async createUser(createUserData: CreateUserRequest): Promise<any> {
        return httpClient.post("/create-user", createUserData);
    }

    static get accessToken(): string | null {
        return localStorage.getItem(tokenKeyword);
    }

    static set accessToken(token: string | null) {
        if (token) {
            localStorage.setItem(tokenKeyword, token);
        } else {
            this.clearTokens();
        }
    }

    static authTokens(token: string) {
        localStorage.setItem(tokenKeyword, token);
    }

    static clearTokens() {
        localStorage.removeItem(tokenKeyword);
    }

    static async logout() {
        const response = await httpClient.get("/logout");
        this.clearTokens();
        window.location.href = ROUTES.AUTH.LOGIN.LINK;
        return response;
    }

    static updateUserDetails(details: CreateUserRequest & { id?: number }) {
        const { id, ...body } = details;
        return httpClient.put(`/user/${id}`, body);
    }
}

export default AuthService;

export type ServerResponse<T> = Promise<AxiosResponse<T>>;

type LoginRequest = {
    email: string;
    password: string;
};

type AuthResponse = {
    id: number;
    type: string;
    token: string;
    refreshToken: string;
    roles: string[];
};

export type CreateUserRequest = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    fatherName: string;
    roles: TRolesKeyword[]; //  "ADMIN" | "USER"
    buildings: []; //  "ADMIN" | "USER"
};
