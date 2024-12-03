import { InputProps } from "antd";
import { SVGProps } from "react";

export default function UploadSendIcon({ shape = "rectangle", status, ...restProps }: Readonly<IconProps>) {
    const pathColor = status === "error" ? "#FE7263" : "#3C7167";

    return (
        <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' {...restProps}>
            <rect width={defaultWidth} height={defaultHeight} rx={IconOptions[shape]} fill={status === "error" ? "#FE72630F" : "#e5ecea"} />
            <path
                d='M12.7746 14.0626L20.0496 33.4626C20.1219 33.6535 20.2509 33.8178 20.4193 33.9332C20.5877 34.0486 20.7873 34.1098 20.9915 34.1084C21.1956 34.1071 21.3945 34.0433 21.5613 33.9256C21.7281 33.8079 21.8549 33.642 21.9246 33.4501L24.8371 25.4376C24.8878 25.3002 24.9677 25.1753 25.0713 25.0717C25.1748 24.9682 25.2997 24.8883 25.4371 24.8376L33.4496 21.9251C33.6415 21.8554 33.8074 21.7286 33.9251 21.5618C34.0428 21.3949 34.1066 21.1961 34.1079 20.992C34.1093 20.7878 34.0482 20.5882 33.9327 20.4198C33.8173 20.2514 33.6531 20.1224 33.4621 20.0501L14.0621 12.7751C13.8823 12.7077 13.6869 12.6934 13.4993 12.7341C13.3116 12.7747 13.1396 12.8685 13.0038 13.0043C12.8681 13.1401 12.7742 13.3121 12.7336 13.4998C12.693 13.6874 12.7072 13.8828 12.7746 14.0626V14.0626Z'
                stroke={pathColor}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path d='M25.0742 25.0752L33.9992 34.0002' stroke={pathColor} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

const defaultWidth = 48;
const defaultHeight = 48;

const IconOptions: Record<IconShape, number> = {
    circle: 12,
    rectangle: 6,
};

type IconShape = "circle" | "rectangle";

type IconProps = SVGProps<SVGSVGElement> & { shape?: IconShape; status?: InputProps["status"] };
