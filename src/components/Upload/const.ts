import { DEFAULT_NOT_ACCEPTED_FILES, DEFAULT_UPLOAD_FILE_UNITS } from "@/models/Upload";
import { FileService, TFileDTO } from "@/service/FileService";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export const DEFAULT_ALL_TYPES_EXCEPT = () => {
    const allTypes = "*/*";
    const excludedTypes = DEFAULT_NOT_ACCEPTED_FILES.map((type) => `!${type}`);
    return `${allTypes},${excludedTypes.join(",")}`;
};

export const DEFAULT_ALL_TYPES_EXCEPT_NOT_ACCEPTED = DEFAULT_ALL_TYPES_EXCEPT();

export const formatFileSize = (sizeInBytes: number): string => {
    let size = sizeInBytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < DEFAULT_UPLOAD_FILE_UNITS.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${DEFAULT_UPLOAD_FILE_UNITS[unitIndex]}`;
};

export const generateFileType = (type: string) => {
    if (type.split("/")[1] === "svg+xml") return "svg";
    return type.split("/")[1];
};

export const getFileContentIcon = (filename?: string) => {
    if (filename) {
        return filename.split(".").at(-1);
    }
    return "";
};

type actionType = "download" | "view";

export const handleDownloadAndViewFile = async ({
    upload,
    action,
    setIsLoading,
}: {
    upload: TFileDTO;
    action: actionType;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
}) => {
    const { original_filename, filename, id } = upload;

    if (!id) {
        toast.error("Fayl tapılmadı.");
        return;
    }

    console.log(id);
    

    setIsLoading?.(true);
    const response = await FileService.downloadFileById(id);
    if (!response?.data) return;

    const fileName = original_filename ?? filename;

    const blob = new Blob([response.data], { type: upload.mime_type });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    if (action === "download") {
        link.setAttribute("download", fileName);
    } else {
        link.setAttribute("target", "_blank");
    }

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setIsLoading?.(false);
};
