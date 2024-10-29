import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";

export class FloorsService {
    public static async getAll({ companyId, buildingId }: { companyId: string; buildingId: string }): Promise<TFloorsResponse> {
        const response: AxiosResponse<TFloorsResponse> = await httpClient.get(`/buildings/${buildingId}/floors`, {
            headers: { CompanyId: companyId },
        });
        return response.data;
    }
}

export type TFloorsResponse = { data: TFloor[] };

export type TFloor = {
    id: string;
    building_id: string;
    name: string;
    floor_number: number;
};
