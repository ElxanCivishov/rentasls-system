import { CancelIcon } from "@/assets/icons";
import FileSkeletonIcon from "@/assets/icons/FileSkeleton";
import { Progress } from "antd";
import { TruncateFileName } from "./UploadedFile";
import { formatFileSize } from "./const";

const UploadingFile = ({
    file,
    progress,
    handleCancel,
    index,
}: {
    file: File;
    progress: number;
    index: number;
    handleCancel: (index: number) => void;
}) => {
    return (
        <div className='upload-file w-full'>
            <div className='flex gap-1 w-full'>
                <FileSkeletonIcon />
                <div className='file-content'>
                    <div>
                        <p>
                            {TruncateFileName(file.name)}
                            <span className='dot'></span>
                            {formatFileSize(file.size)}
                        </p>
                        <span className='percent'>{progress}%</span>
                    </div>
                    <Progress percent={progress} showInfo={false} size='small' />
                </div>
            </div>
            <button type='button' onClick={() => handleCancel(index)}>
                <img src={CancelIcon} alt='cancel' className='pointer' />
            </button>
        </div>
    );
};

export default UploadingFile;
