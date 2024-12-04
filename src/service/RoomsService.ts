import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";
import { TBuilding } from "./BuildingsService";
import { TFileDTO } from "./FileService";

export class RoomsService {
    public static async getAll(filters: TFilterRooms): Promise<TRoomResponse> {
        const { companyId, ...restFilters } = filters;

        const params = new URLSearchParams();

        Object.entries(restFilters).forEach(([key, value]) => {
            if (value) {
                const paramKey = key === "for_map" ? `options[${key}]` : `filters[${key}]`;
                params.append(paramKey, String(value));
            }
        });

        if (!params) return { data: [] };

        const response: AxiosResponse<TRoomResponse> = await httpClient.get(`/rooms?${params.toString()}`, { headers: { CompanyId: companyId } });
        return response.data;
    }

    public static async getById({ companyId, roomId }: { companyId?: string; roomId: string }): Promise<TSingleRoomResponse> {
        const response = await httpClient.get(`/rooms/${roomId}`, { headers: { CompanyId: companyId } });
        return response.data;
    }

    public static async getBySearch(term: string): Promise<TSearchResponse> {
        const response: AxiosResponse<TSearchResponse> = await httpClient.get(`/rooms/search`, { params: { term } });
        return response.data;
    }

    static async update({ roomId, companyId, content }: { roomId: string; companyId: string; content: TRoomDetailsRequest }) {
        const response = await httpClient.put(`/rooms/${roomId}`, content, { headers: { CompanyId: companyId } });
        return response.data;
    }

    public static async delete(id: string, companyId: string) {
        const response = await httpClient.delete(`rooms/${id}`, { headers: { CompanyId: companyId } });
        return response;
    }
}

export type TSearchDTO = {
    id: string;
    floor_id: string;
    director: string;
    number: string;
    renter_name: string;
    floor: TFloor;
};

export type TSearchResponse = {
    data: TSearchDTO[];
};

export type TFilterRooms = {
    companyId?: string;
    floor_id: string;
    year?: number | null;
    month?: number | null;
    for_map?: number | null;
};

export type TRoomResponse = {
    data: TRoomDetails[];
};

export type TSingleRoomResponse = {
    data: TRoomDetails;
};

export type TRoomDetails = {
    id: string;
    floor_id: string;
    handover_id: string | null;
    renter_name: string;
    renter_phone: string;
    destination: string;
    status: string;
    director: string;
    official_payment: number;
    unofficial_payment: number;
    voen_or_fin: string;
    area: number;
    rent_amount: number;
    contract_id: string;
    number: string;
    type: string;
    month: number;
    year: number;
    debt: number;
    total_debt: number;
    price_per_square_meter: number;
    created_at: string;
    updated_at: string;
    contract: TContract;
    handover: THandover | null;
    key_for_room: string;
    key_for_svg: string;
    floor: TFloor;
    files: TFileDTO[];
    rental_dates: string[];
};

export type TContract = {
    id: string;
    number: string;
    created_at: string;
    updated_at: string;
    files: TFileDTO[];
};

export type THandover = {
    id: string;
    number: string;
    created_at: string;
    updated_at: string;
    files: TFileDTO[];
};

export type TFloor = {
    id: string;
    building_id: string;
    building_name: string;
    building: TBuilding;
    name: string;
    number: number;
    created_at: string | null;
    updated_at: string | null;
};

export type TRoomDetailsRequest = Partial<{
    contract_number: string;
    contract: TContract;
    companyId: string;
    contract_id: string;
    roomId: string;
    id: string;
    floor_id: string;
    handover_id: string | null;
    handover_number: string;
    director: string;
    renter_name: string | null;
    official_payment: number | null;
    unofficial_payment: number | null;
    voen_or_fin: string;
    area: number | null;
    rent_amount: number | null;
    room_number: string;
    type: string;
    debt: number | null;
    total_debt: number | null;
    number: string | null;
    key_for_room: string;
    key_for_svg?: string;
    price_per_square_meter?: number | null;
    files: TFileDTO[];
    contractFiles: TFileDTO[];
    handoverFiles: TFileDTO[];
}>;

export type TUpdateRoomRequest = Partial<{
    contract_number: string;
    director?: string;
    renter_name?: string;
    official_payment?: number;
    unofficial_payment?: number;
    area?: number;
    rent_amount?: number;
    room_number?: string;
    type?: string;
    debt?: number;
    price_per_square_meter?: number;
    voen_or_fin?: string;
}>;
