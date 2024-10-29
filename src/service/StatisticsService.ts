import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";

export class StatisticsService {
    public static async getAll(companyId: string): Promise<TStatisticsResponse> {
        const response: AxiosResponse<TStatisticsResponse> = await httpClient.get(`/statistic`, {
            headers: { CompanyId: companyId },
        });
        return response.data;
    }
}

export type TFloorStatistics = {
    id: string;
    keyword: string;
    name: string;
    countOfRooms: number;
    emptyRooms: number;
    countOfRoomsForRent: number;
    areaOfRoomsForRent: number;
    areaEmptyRooms: number;
    totalArea: number;
    total_debt: number;
    official_payment: number;
    unofficial_payment: number;
};

type TStatisticsResponse = {
    data: {
        totalNumberOfRooms: number;
        numberOfEmptyRooms: number;
        numberOfRoomsForRent: number;
        area: {
            total: number;
            floor1: number;
            floor2: number;
            floor3: number;
            floor4: number;
            floor5: number;
        };
        debt: {
            floor1: Record<string, number>;
            floor2: Record<string, number>;
            floor3: Record<string, number>;
            floor4: Record<string, number>;
            floor5: Record<string, number>;
            total: Record<string, number>;
        };
        costOfRent: {
            floor1: Record<string, number>;
            floor2: Record<string, number>;
            floor3: Record<string, number>;
            floor4: Record<string, number>;
            floor5: Record<string, number>;
            total: Record<string, number>;
        };
    };
};
