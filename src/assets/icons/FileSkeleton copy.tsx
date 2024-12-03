import { InputProps } from "antd";
import { SVGProps } from "react";

export default function FileSkeletonIcon({ shape = "rectangle", status, ...restProps }: Readonly<IconProps>) {
    const pathColor = status === "error" ? "#fe7263" : "#CBD5E0";

    return (
        <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' {...restProps}>
            <rect width={defaultWidth} height={defaultHeight} rx={IconOptions[shape]} fill='#EDF2F7' />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M28.9548 30.6318H19.3281C18.7761 30.6318 18.3281 30.1838 18.3281 29.6318C18.3281 29.0798 18.7761 28.6318 19.3281 28.6318H28.9548C29.5068 28.6318 29.9548 29.0798 29.9548 29.6318C29.9548 30.1838 29.5068 30.6318 28.9548 30.6318Z'
                fill={pathColor}
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M28.9548 25.0498H19.3281C18.7761 25.0498 18.3281 24.6018 18.3281 24.0498C18.3281 23.4978 18.7761 23.0498 19.3281 23.0498H28.9548C29.5068 23.0498 29.9548 23.4978 29.9548 24.0498C29.9548 24.6018 29.5068 25.0498 28.9548 25.0498Z'
                fill={pathColor}
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M23.0015 19.4805H19.3281C18.7761 19.4805 18.3281 19.0325 18.3281 18.4805C18.3281 17.9285 18.7761 17.4805 19.3281 17.4805H23.0015C23.5535 17.4805 24.0015 17.9285 24.0015 18.4805C24.0015 19.0325 23.5535 19.4805 23.0015 19.4805Z'
                fill={pathColor}
            />
            <mask id='mask0_3080_62512' style={{ maskType: "luminance" }} maskUnits='userSpaceOnUse' x='12' y='10' width='25' height='28'>
                <path fillRule='evenodd' clipRule='evenodd' d='M12 10.667H36.2196V37.2134H12V10.667Z' fill='white' />
            </mask>
            <g mask='url(#mask0_3080_62512)'>
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M29.212 12.6665L18.96 12.6718C15.856 12.6905 14 14.6105 14 17.8092V30.0705C14 33.2905 15.8733 35.2132 19.008 35.2132L29.26 35.2092C32.364 35.1905 34.22 33.2678 34.22 30.0705V17.8092C34.22 14.5892 32.348 12.6665 29.212 12.6665ZM19.0093 37.2132C14.8173 37.2132 12 34.3425 12 30.0705V17.8092C12 13.4985 14.7293 10.6972 18.9533 10.6718L29.2107 10.6665H29.212C33.404 10.6665 36.22 13.5372 36.22 17.8092V30.0705C36.22 34.3798 33.4907 37.1825 29.2667 37.2092L19.0093 37.2132Z'
                    fill={pathColor}
                />
            </g>
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
