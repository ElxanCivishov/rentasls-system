import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";

export class RoleService {
    public static async getAll(): Promise<TRolesDTO> {
        const response: AxiosResponse<TRolesDTO> = await httpClient.get("roles");
        return response.data;
    }
}

export type TRoleType = "ALL" | "READ";

export interface TRole {
    id: string;
    name: string;
    operation: TRoleType;
    building_id: string;
    created_at: string;
    updated_at: string;
}

export type TRolesDTO = {
    data: TRole[];
};
