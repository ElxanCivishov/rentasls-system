import { TFileDto } from "@/service/FileService";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./customSwiper.scss";

export default function CustomSwiper({ files = [] }: Readonly<{ files?: TFileDto[] }>) {
    if (files.length === 0) return;

    return (
        <div className='customSwiper'>
            <Swiper
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className='mySwiper'
            >
                {files.map((img) => (
                    <SwiperSlide key={img.id}>
                        <div className='commentCard'>
                            <img src={`${import.meta.env.VITE_APP_SERVER_URL}${img.path}`} alt='' className='previewImage' />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
