import UploadBtnContent from "@/components/Upload/UploadBtnContent";
import UploadedFile from "@/components/Upload/UploadedFile";
import { FileService, TFileDTO } from "@/service/FileService";
import { FileValidator } from "@/utils/Validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import "./Upload.scss";
import UploadingFile from "./UploadingFile";

const PROGRESS_INTERVAL_DURATION = 60;

type UploadFilesProps = {
    uploadedFiles?: TFileDTO[];
    setUploadedFiles: (files: TFileDTO[]) => void;
    showUploadedColumns?: string;
    isShowOnlyAddBtn?: boolean;
    title?: string;
    roomKey?: string;
    companyId?: string;
    modelName?: string;
};

const UploadDocumentsWrapper: FC<UploadFilesProps> = ({
    uploadedFiles = [],
    setUploadedFiles,
    showUploadedColumns,
    title,
    isShowOnlyAddBtn = false,
    roomKey,
    companyId,
    modelName = "Room",
}) => {
    const queryClient = useQueryClient();
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);
    const [startProgress, setStartProgress] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [showErrorMessageForAddBtn, setShowErrorMessageForAddBtn] = useState<boolean>(false);

    useEffect(() => {
        if (!uploadFiles) return;
        const intervalId = setInterval(() => {
            if (startProgress) setUploadProgress((prevProgress) => prevProgress.map((progress) => (progress < 100 ? progress + 1 : 0)));
        }, PROGRESS_INTERVAL_DURATION);

        return () => {
            clearInterval(intervalId);
        };
    }, [startProgress, uploadFiles]);

    const handleUpload = (files: FileList) => {
        const validFiles: File[] = [];

        for (const file of files) {
            const isValid = FileValidator.validate(file);
            if (isValid) {
                validFiles.push(file);
            } else {
                setShowErrorMessageForAddBtn(true);
                setTimeout(() => {
                    setShowErrorMessageForAddBtn(false);
                }, 10000);
                setShowErrorMessage(true);
            }
        }

        if (validFiles.length === 0) return;

        setUploadFiles(validFiles);
        setUploadProgress(validFiles.map(() => 0));
        createFileMutation.mutate(validFiles);
    };

    const createFileMutation = useMutation({
        mutationFn: async (files: File[]) =>
            FileService.createFileMultiple({ files, companyId: companyId, model_id: roomKey!, model_name: modelName }),
        onSuccess: (data) => {
            setUploadedFiles([...uploadedFiles, ...data.data]);
            setUploadFiles([]);
            setUploadProgress([]);
            setStartProgress(false);
            queryClient.invalidateQueries({ queryKey: ["room-details"] });
        },
        onError: () => {
            setUploadFiles([]);
            setUploadProgress([]);
        },
    });

    const deleteFileMutation = useMutation({
        mutationFn: async (id?: string | number) => {
            if (!id) return;
            FileService.deleteFileById(String(id));
            return id;
        },
        onSuccess: (id) => {
            const filteredFiles = uploadedFiles.filter((file) => file.id !== id);
            setUploadedFiles(filteredFiles);
            queryClient.invalidateQueries({ queryKey: ["room-details"] });
        },
    });

    const handleCancelUploadFile = (index: number) => {
        setUploadFiles((prev) => prev.filter((_, idx) => idx !== index));
        setUploadProgress([]);
        setStartProgress(false);
    };

    const handleChangeCustomFileName = (filename: string, index?: number) => {
        const newUploadedFiles = uploadedFiles.map((file, idx) => (idx === index ? { ...file, customFilename: filename } : file));
        setUploadedFiles(newUploadedFiles);
    };

    const showDocumentsTitle = !isShowOnlyAddBtn || uploadedFiles.length > 0 || uploadProgress.length > 0;
    const flexClass = uploadedFiles.length > 0 || uploadProgress.length > 0 ? "flex" : "flex-column col-reverse";

    const uploadedFilesClass = uploadedFiles.length > 1 || uploadFiles.length > 1 ? "documents-2" : "documents-1";
    const wrapperClass = showUploadedColumns ?? uploadedFilesClass;

    const isShowUploads = uploadedFiles.length > 0 || uploadProgress.length > 0;

    return (
        <div className='upload-container'>
            {showDocumentsTitle && title && <h3 className='h3'>{title}</h3>}
            <div className={` ${flexClass} gap-1.5 w-full`}>
                {isShowUploads && (
                    <div className={`${wrapperClass} w-full`}>
                        {uploadedFiles?.map((upload, index) => (
                            <UploadedFile
                                handleChangeCustomFileName={handleChangeCustomFileName}
                                key={upload.id}
                                upload={upload}
                                index={index}
                                handleDelete={({ id }) => deleteFileMutation.mutate(id)}
                                showError={showErrorMessage}
                            />
                        ))}
                        {uploadProgress.map(
                            (progress, index) =>
                                uploadFiles[index] && (
                                    <UploadingFile
                                        index={index}
                                        key={uploadFiles[index].name}
                                        file={uploadFiles[index]}
                                        progress={progress}
                                        handleCancel={handleCancelUploadFile}
                                    />
                                ),
                        )}
                    </div>
                )}
                <UploadBtnContent
                    setStartProgress={setStartProgress}
                    onFilesChange={handleUpload}
                    uploadedFiles={uploadedFiles}
                    uploadProgress={uploadProgress}
                    showError={showErrorMessageForAddBtn}
                    showAdditionalBtn={isShowOnlyAddBtn}
                />
            </div>
        </div>
    );
};

export default UploadDocumentsWrapper;
