import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";
import { ServerResponse } from "./AuthService";
import { TRole } from "./RoleService";

export class UserService {
    public static async getUser(): Promise<TUser> {
        const response: AxiosResponse<TUser> = await httpClient.get("me");
        return response.data;
    }

    public static async getAll(): Promise<{ data: TUser[] }> {
        const response: AxiosResponse<{ data: TUser[] }> = await httpClient.get("users");
        return response.data;
    }

    public static async getById(id: string): Promise<TUser> {
        const response: AxiosResponse<TUser> = await httpClient.get(`users/${id}`);
        return response.data;
    }

    static async update({ id, ...content }: Partial<TUserRequest>): Promise<ServerResponse<TUser>> {
        const response = await httpClient.put(`/users/${id}`, content);
        return response.data;
    }

    static async create(content: Partial<TUserRequest>): Promise<ServerResponse<TUser>> {
        const response = await httpClient.post(`/register`, content);
        return response.data;
    }

    static async delete(id: string) {
        const response = await httpClient.delete(`/users/${id}`);
        return response.data;
    }
}

export type TUser = {
    id: string;
    name: string;
    email: string;
    roles: TRole[];
};

export type TUserRequest = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    roles: { id: string }[];
};

export type TUserRequestState = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    roles: string[];
};
