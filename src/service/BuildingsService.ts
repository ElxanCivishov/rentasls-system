import { httpClient } from "@/httpClient";
import { BUILDINGS } from "@/models/Buildings";
import { AxiosResponse } from "axios";
import { ServerResponse } from "./AuthService";

export class BuildingsService {
    public static async getAll(): Promise<TBuildingResponse> {
        const response: AxiosResponse<TBuildingResponse> = await httpClient.get(`/buildings`);
        return response.data;
    }

    static async update({
        buildingId,
        companyId,
        content,
    }: {
        buildingId: string;
        companyId: string;
        content: TUpdateBuildingRequest;
    }): Promise<ServerResponse<TBuilding>> {
        const response = await httpClient.put(`/buildings/${buildingId}`, content, { headers: { CompanyId: companyId } });
        return response.data;
    }
}

export type TBuildingResponse = {
    data: TBuilding[];
};

export type TBuilding = {
    id: string;
    name: string;
    address: string;
    number_of_floors: number;
    number_of_rooms: number;
    area_of_rent_rooms: string;
    area_of_rooms: string;
    number_of_empty_rooms: number;
    area_of_empty_rooms: number;
    number_of_rent_rooms: number;
    company_id: string;
    created_at: string;
    updated_at: string;
    is_erazi: boolean;
    properties: TPropertiesProps[];
};

export type TUpdateBuildingRequest = {
    name: string;
    address?: string;
    properties: TNewFieldProps[];
};

export type TNewFieldProps = {
    key: string;
    value: string;
};

export type TPropertiesProps = {
    id: string;
    building_id: string;
    key: string;
    value: string;
    created_at: string;
    updated_at: string;
};

export type BUILDINGS_TYPE = keyof typeof BUILDINGS;
