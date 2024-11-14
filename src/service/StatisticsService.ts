import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";

export class StatisticsService {
    public static async getById(companyId?: string): Promise<TStatisticsResponse> {
        const response: AxiosResponse<TStatisticsResponse> = await httpClient.get(`/statistic/building`, {
            headers: { CompanyId: companyId },
        });
        return response.data;
    }

    public static async getAll(): Promise<TALLStatisticsResponse> {
        const response: AxiosResponse<TALLStatisticsResponse> = await httpClient.get(`/statistic/buildings`, {
            headers: { CompanyId: "01JASKZ8W7Y7W7NRFVN8RGBAAE" },
        });
        return response.data;
    }

    public static async getTotalStatistics(): Promise<TTotalStatisticsResponse> {
        const response: AxiosResponse<TTotalStatisticsResponse> = await httpClient.get(`/statistic/general`, {
            headers: { CompanyId: "01JASKZ8W7Y7W7NRFVN8RGBAAE" },
        });
        return response.data;
    }
}

export type TStatistics = {
    building_name: string;
    total_number_of_rooms: number;
    number_of_empty_rooms: number;
    number_of_rooms_for_rent: number;
    total_area_of_rooms: number;
    area_of_empty_rooms: number;
    area_of_rooms_for_rent: number;
    total_debt: number;
    total_official_payment: number;
    total_unofficial_payment: number;
    total_cost_of_rent: number;
    floors?: TFloorStatistics[];
};

export type TStatisticsResponse = {
    data: TStatistics;
};

export type TTotalStatisticsResponse = {
    data: TFloorStatistics;
};

export type TALLStatisticsResponse = {
    data: TStatistics[];
};

export type TFloorStatistics = {
    floor_id: string;
    total_number_of_rooms: number;
    number_of_empty_rooms: number;
    total_debt: number;
    total_official_payment: number;
    total_unofficial_payment: number;
    total_cost_of_rent: number;
    total_area_of_rooms: number;
    area_of_empty_rooms: number;
    floor_name: string;
    number_of_rooms_for_rent: number;
    area_of_rooms_for_rent: number;
};
