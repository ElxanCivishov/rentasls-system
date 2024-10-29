import { FileService } from "@/service/FileService";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Image, Upload } from "antd";
import { FC, useState } from "react";

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadImages: FC<{ roomKey?: string; companyId: string }> = ({ roomKey, companyId }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as any);
        }

        setPreviewImage(file.url ?? (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <Upload
                action={(file) => FileService.createFileMultiple({ model_name: "Room", model_id: roomKey!, files: [file], companyId })}
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept='image/jpeg, image/png'
            >
                {fileList.length >= 15 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default UploadImages;
