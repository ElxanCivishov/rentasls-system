import DownloadFile from "@/components/Upload/DownloadFile";
import { TFileDTO } from "@/service/FileService";
import { Card } from "antd";
import { FC } from "react";
import "./Upload.scss";

const DownloadedDocumentsWrapper: FC<DownloadedDocumentsWrapperProps> = function ({
    mainFile,
    otherFiles = [],
    mainTitle,
    otherTitle = "Sənədlər",
    withCard = true,
    otherFilesColumn = 2,
}) {
    if (!mainFile && !otherFiles?.length) return null;

    const otherFilesWrapperClass = otherFiles.length > 1 ? `grid-data-${otherFilesColumn}` : "grid-data-1";

    const content = (
        <div className='flex-column'>
            {mainFile && (
                <>
                    <h4 className='h3 color-main'>{mainTitle}</h4>
                    <DownloadFile upload={mainFile} />
                </>
            )}
            {otherFiles.length > 0 && (
                <>
                    {otherTitle && <h4 className='h3 color-main'>{otherTitle}</h4>}
                    <div className='flex gap-1 w-full'>
                        <div className={`${otherFilesWrapperClass} w-full`}>
                            {otherFiles.map((upload) => (
                                <DownloadFile key={upload.id} upload={upload} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return withCard ? <Card>{content}</Card> : content;
};

export default DownloadedDocumentsWrapper;

type DownloadedDocumentsWrapperProps = {
    mainFile?: TFileDTO | null;
    otherFiles?: TFileDTO[];
    mainTitle?: string;
    otherTitle?: string;
    withCard?: boolean;
    otherFilesColumn?: number;
};
