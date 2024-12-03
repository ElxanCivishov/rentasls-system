import { CustomTooltip } from "@/components/CustomTooltip";
import { TFileDTO } from "@/service/FileService";
import { FC } from "react";

import { getFileContentIcon } from "./const";

import FileActionMenu from "./FileActionMenu";
import { DEFAULT_UPLOAD_FILE_NAME_SHOW_COUNT } from "@/models/Upload";

export type TUploadedFiles = {
    file: File;
    fName?: string;
};

type UploadedFileProps = {
    upload: TFileDTO;
    handleDelete: ({ id, index }: { id?: string; index?: number }) => void;
    handleChangeCustomFileName?: (name: string, index?: number) => void;
    index: number;
    showError?: boolean;
};

export const TruncateFileName = (filename: string, maxLength: number = DEFAULT_UPLOAD_FILE_NAME_SHOW_COUNT) => {
    return filename?.length > maxLength ? (
        <CustomTooltip title={filename}>
            <span>{filename.slice(0, maxLength) + "..."}</span>
        </CustomTooltip>
    ) : (
        filename
    );
};

const UploadedFile: FC<UploadedFileProps> = ({ upload, index, handleDelete }) => {
    const { filename, id } = upload;

    return (
        <div className='upload-file'>
            <div className='flex gap-1 w-full'>
                <div className='file-icon'>
                    <span>{getFileContentIcon(filename)}</span>
                </div>
                <div className={`file-content`}>
                    <div>
                        <p>
                            <span className='truncate-name'>{TruncateFileName(filename)}</span>
                        </p>
                    </div>
                </div>
            </div>

            <FileActionMenu upload={upload} onDeleteHandler={() => handleDelete({ id, index })} />
        </div>
    );
};

export default UploadedFile;
