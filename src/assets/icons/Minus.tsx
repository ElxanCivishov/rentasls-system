import { SVGProps } from "react";

export default function MinusIcon({ shape = "circle", ...restProps }: IconProps) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 24 24`} fill='none' {...restProps}>
            <rect width={defaultWidth} height={defaultHeight} rx={IconOptions[shape]} fill='#FE7263' fillOpacity='0.06' />
            <path d='M6.5 12.0001H17.5' stroke='#FE7263' strokeWidth='1.125' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

const defaultWidth = 24;
const defaultHeight = 24;

const IconOptions: Record<IconShape, number> = {
    circle: 12,
    rectangle: 6,
};

export type IconShape = "circle" | "rectangle";

type IconProps = SVGProps<SVGSVGElement> & { shape?: IconShape };
