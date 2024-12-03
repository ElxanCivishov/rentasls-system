import { PlusText, UploadIcon } from "@/assets/icons";
import FileSkeletonIcon from "@/assets/icons/FileSkeleton";
import { TFileDTO } from "@/service/FileService";
import { Button } from "antd";
import { ChangeEvent, Dispatch, DragEvent, FC, HTMLProps, SetStateAction, useRef, useState } from "react";
import { DEFAULT_ALL_TYPES_EXCEPT_NOT_ACCEPTED } from "./const";
import { DEFAULT_UPLOAD_FILE_MAX_SIZE_TEXT } from "@/models/Upload";

const UploadBtnContent: FC<UploadBtnContentProps> = ({
    onFilesChange,
    setStartProgress,
    showError,
    showAdditionalBtn = false,
    multiple = true,
    uploadedFiles = [],
    uploadProgress = [],
    ...rest
}) => {
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const showErrorClass = showError ? "error" : "";
    const dragAndDropClass = dragging ? "dragging" : "";
    const showAdditionalBtnDocuments = showAdditionalBtn && uploadedFiles.length === 0 && uploadProgress.length === 0;

    const handleClickUpload = () => {
        if (uploadInputRef.current) uploadInputRef.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartProgress(true);
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;
        onFilesChange(selectedFiles);
        event.target.value = "";
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        handleDragAndDrop({ event, setDragging, dragging: false });
        const fileList = [...event.dataTransfer.files];
        onFilesChange(fileList as any);
    };

    return (
        <div {...rest} style={{ position: "relative" }}>
            <input
                type='file'
                multiple={multiple}
                accept={DEFAULT_ALL_TYPES_EXCEPT_NOT_ACCEPTED}
                hidden
                ref={uploadInputRef}
                onChange={(event) => handleFileChange(event)}
                style={{ display: "none" }}
            />

            {uploadedFiles.length > 0 || uploadProgress.length > 0 ? (
                <div
                    className={`add-documents ${showErrorClass} ${dragAndDropClass}`}
                    onDragEnter={(event) => handleDragAndDrop({ event, setDragging, dragging: true })}
                    onDragOver={(event) => handleDragAndDrop({ event, setDragging, dragging: true })}
                    onDragLeave={(event) => handleDragAndDrop({ event, setDragging, dragging: false })}
                    onDrop={handleDrop}
                >
                    <p>{DEFAULT_UPLOAD_FILE_MAX_SIZE_TEXT}</p>
                    <Button type='primary' className='upload-btn' icon={<UploadIcon />} onClick={handleClickUpload}>
                        Yüklə
                    </Button>
                </div>
            ) : (
                !showAdditionalBtn && (
                    <div className='flex-column w-full'>
                        <div className={`add-document ${showErrorClass}`}>
                            <div className='flex align-center gap-1'>
                                <FileSkeletonIcon status={showErrorClass} />
                                <span className='add-new-text'>Fayl əlavə edin</span>
                            </div>
                            <Button type='primary' className='upload-btn' icon={<UploadIcon />} onClick={handleClickUpload}>
                                Yüklə
                            </Button>
                        </div>
                        <div className={`additional-wrapper ${showErrorClass}`}>
                            <p className='error-msj'>{DEFAULT_UPLOAD_FILE_MAX_SIZE_TEXT}</p>
                        </div>
                    </div>
                )
            )}

            {showAdditionalBtnDocuments && (
                <div className='additional-btn-wrapper'>
                    <Button
                        className='additional-documents-btn'
                        icon={<PlusText stroke='#3C7167' width={20} height={20} />}
                        onClick={handleClickUpload}
                    >
                        Əlavə sənədlər
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UploadBtnContent;

type UploadBtnContentProps = {
    onFilesChange: (files: FileList) => void;
    multiple?: boolean;
    showError?: boolean;
    showAdditionalBtn?: boolean;
    setStartProgress: Dispatch<SetStateAction<boolean>>;
    uploadedFiles?: TFileDTO[];
    uploadProgress?: number[];
} & HTMLProps<HTMLDivElement>;

type HandleDragAndDropProps = {
    event: DragEvent<HTMLDivElement>;
    setDragging?: Dispatch<SetStateAction<boolean>>;
    dragging?: boolean;
};

const handleDragAndDrop = ({ event, setDragging, dragging = false }: HandleDragAndDropProps) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging?.(dragging);
};
