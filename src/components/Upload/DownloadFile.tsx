import { DownloadIcon } from "@/assets/icons";
import { TFileDTO } from "@/service/FileService";
import { Spin } from "antd";
import { useState } from "react";
import { CustomTooltip } from "../CustomTooltip";
import { getFileContentIcon, handleDownloadAndViewFile } from "./const";
import "./Upload.scss";
import { TruncateFileName } from "./UploadedFile";

const DownloadFile = ({ upload }: { upload: TFileDTO }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { original_filename, filename } = upload;

    return (
        <div className='upload-file'>
            <div className='file-icon'>
                <span>{getFileContentIcon(filename)}</span>
            </div>
            <div className='file-content'>{original_filename && <h4> {TruncateFileName(original_filename)}</h4>}</div>
            <CustomTooltip title={isLoading ? "Yüklənir" : "Yüklə"}>
                {isLoading ? (
                    <div className='download-spin'>
                        <Spin />
                    </div>
                ) : (
                    <button type='button' onClick={() => handleDownloadAndViewFile({ upload, action: "download", setIsLoading })} className='pointer'>
                        <DownloadIcon width={28} height={28} />
                    </button>
                )}
            </CustomTooltip>
        </div>
    );
};

export default DownloadFile;
