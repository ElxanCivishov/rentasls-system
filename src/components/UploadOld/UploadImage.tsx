import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Upload.scss";

interface ImageUploadProps {
    onUpload: (file: File) => void;
    selectedImage?: File | null;
    defaultUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, selectedImage, defaultUrl }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!selectedImage) {
            setPreview(null);
        }
    }, [selectedImage]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className='upload-with-preview'>
            <input type='file' ref={fileInputRef} onChange={handleImageChange} accept='image/*' style={{ display: "none" }} />

            <button onClick={handleButtonClick} className='upload-img'>
                Şəkil yükləyin
            </button>

            <button className='img-wrapper' onClick={handleButtonClick}>
                <img src={preview ?? defaultUrl} alt='Preview' />
            </button>
        </div>
    );
};

export default ImageUpload;
