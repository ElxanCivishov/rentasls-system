import { httpClient } from "@/httpClient";
import { AxiosResponse } from "axios";

export class FileService {
    public static async createFileMultiple(content: TCreateFileRequest) {
        const formData = new FormData();

        content.files.forEach((file: File, index: number) => {
            formData.append(`files[${index}]`, file);
        });

        formData.append("model_name", content.model_name);
        formData.append("model_id", content.model_id);

        const response = await httpClient.post("files", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                CompanyId: content.companyId,
            },
        });
        return response.data;
    }

    public static async deleteFileById(id: string, companyId?: string) {
        const response: AxiosResponse = await httpClient.delete(`files/${id}`, { headers: { CompanyId: companyId } });
        return response;
    }

    public static async downloadFileById(id: string) {
        const response: AxiosResponse = await httpClient.get(`files/${id}`, { responseType: "blob" });
        return response.data;
    }
}

type TCreateFileRequest = {
    files: File[];
    model_name: string;
    model_id: string;
    companyId?: string;
};

export type TFileDTO = {
    id: string;
    filename: string;
    original_filename: string;
    path: string;
    mime_type: string;
    fileable_type: string;
    fileable_id: string;
    created_at: string;
    updated_at: string;
};
