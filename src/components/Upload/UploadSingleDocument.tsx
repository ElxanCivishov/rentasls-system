import { UploadIcon } from "@/assets/icons";
import FileSkeletonIcon from "@/assets/icons/FileSkeleton";
import { DEFAULT_UPLOAD_FILE_MAX_SIZE_TEXT } from "@/models/Upload";
import { FileService, TFileDTO } from "@/service/FileService";
import { FileValidator } from "@/utils/Validator";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import UploadedFile from "./UploadedFile";
import UploadingFile from "./UploadingFile";
import { DEFAULT_ALL_TYPES_EXCEPT_NOT_ACCEPTED } from "./const";

const PROGRESS_INTERVAL_DURATION = 60;
const UPLOAD_COMPLETE_TIMEOUT = 5000;

type UploadSingleFileProps = {
    uploadedFile: TFileDTO | null;
    setUploadedFile: Dispatch<SetStateAction<TFileDTO | null>>;
    title?: string;
    subTitle?: string;
    oldUploadedFile?: TFileDTO | null;
    setOldUploadedFile?: Dispatch<SetStateAction<TFileDTO | null>>;
    handleChangeFileNameFromOutside?: (name: string) => void;
    checkValidate?: boolean;
};

const UploadSingleFile: FC<UploadSingleFileProps> = ({
    setUploadedFile,
    uploadedFile,
    subTitle,
    title,
    oldUploadedFile,
    setOldUploadedFile,
    checkValidate = false,
    handleChangeFileNameFromOutside,
}) => {
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const uploadInputRef = useRef<HTMLInputElement | null>(null);

    const handleUpload = (file: File) => {
        const isValid = FileValidator.validate(file);
        if (!isValid) {
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, UPLOAD_COMPLETE_TIMEOUT);
            return;
        }

        setUploadFile(file);
        setUploadProgress(0);
        createFileMutation.mutate(file);
    };

    const createFileMutation = useMutation({
        mutationFn: async (file: File) => FileService.createFile({ file }),
        onSuccess: (data) => {
            setUploadedFile(data);
            setUploadFile(null);
            setUploadProgress(0);
        },
        onError: () => {
            setUploadFile(null);
            setUploadProgress(0);
        },
    });

    const deleteFileMutation = useMutation({
        mutationFn: async (id: number) => FileService.deleteFileById(id),
        onSuccess: () => setUploadedFile(null),
    });

    useEffect(() => {
        if (!uploadFile) return;

        const intervalId = setInterval(() => {
            setUploadProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 0));
        }, PROGRESS_INTERVAL_DURATION);

        return () => {
            clearInterval(intervalId);
        };
    }, [uploadFile]);

    useEffect(() => {
        setShowErrorMessage(checkValidate);
    }, [checkValidate]);

    const handleClickUpload = () => {
        if (uploadInputRef.current) uploadInputRef.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            handleUpload(selectedFile);
            event.target.value = "";
        }
    };

    const handleDeleteUploadedFile = (id?: number) => {
        if (id) deleteFileMutation.mutate(id);
    };

    const handleCancelUploadFile = () => {
        setUploadFile(null);
        setUploadProgress(0);
    };

    const handleChangeCustomFileName = (name: string) => {
        if (handleChangeFileNameFromOutside) return handleChangeFileNameFromOutside(name);

        setUploadedFile((prev) => (!prev ? prev : { ...prev, label: name }));
    };

    const handleChangeMainFilename = (name: string) => {
        if (handleChangeFileNameFromOutside) return handleChangeFileNameFromOutside(name);
        setOldUploadedFile?.((prev) => (!prev ? prev : { ...prev, label: name }));
    };

    const renderFile = () => {
        if (uploadedFile) {
            return (
                <UploadedFile
                    handleChangeCustomFileName={handleChangeCustomFileName}
                    key={uploadedFile.id}
                    upload={uploadedFile}
                    index={0}
                    handleDelete={({ id }) => handleDeleteUploadedFile(id)}
                    showError={showErrorMessage}
                />
            );
        }

        if (uploadProgress > 0 && uploadFile) {
            return (
                <UploadingFile index={0} key={uploadFile.name} file={uploadFile} progress={uploadProgress} handleCancel={handleCancelUploadFile} />
            );
        }

        if (oldUploadedFile) {
            return (
                <UploadedFile
                    handleChangeCustomFileName={handleChangeMainFilename}
                    key={oldUploadedFile.id}
                    upload={oldUploadedFile}
                    index={0}
                    handleDelete={() => setOldUploadedFile?.(null)}
                    showError={showErrorMessage}
                />
            );
        }

        return null;
    };

    return (
        <div className='single-file-upload'>
            {title && <h3 className='form-title'>{title}</h3>}
            {(uploadedFile || uploadProgress > 0 || oldUploadedFile) && (
                <div className='flex-column'>
                    <h3 className='h3 color-main'>
                        {subTitle ?? "Resipiyentin göndəriş forması"} <span className='required-star'>*</span>
                    </h3>
                    <div>{renderFile()}</div>
                </div>
            )}
            {!uploadedFile && !uploadProgress && !oldUploadedFile && (
                <div>
                    <input
                        type='file'
                        accept={DEFAULT_ALL_TYPES_EXCEPT_NOT_ACCEPTED}
                        hidden
                        ref={uploadInputRef}
                        onChange={(event) => handleFileChange(event)}
                    />

                    <div className='flex-column w-full'>
                        <div className={`add-document ${showErrorMessage ? "error" : ""}`}>
                            <div className='flex align-center gap-1'>
                                <FileSkeletonIcon status={showErrorMessage ? "error" : ""} />
                                <span className='add-new-text'>Fayl əlavə edin</span>
                            </div>
                            <Button type='primary' className='upload-btn' icon={<UploadIcon />} onClick={handleClickUpload}>
                                Yüklə
                            </Button>
                            <div className='additional-wrapper'>
                                <p className='error-msj'>{DEFAULT_UPLOAD_FILE_MAX_SIZE_TEXT}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadSingleFile;
