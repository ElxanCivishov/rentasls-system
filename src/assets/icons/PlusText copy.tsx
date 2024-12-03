import { SVGProps } from "react";

export default function PlusTextIcon({ ...restProps }: IconProps) {
    return (
        <svg width={defaultWidth} height={defaultHeight} viewBox='0 0 21 20' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...restProps}>
            <path d='M3.625 10H17.375' stroke={restProps.stroke ?? "white"} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M10.5 3.125V16.875' stroke={restProps.stroke ?? "white"} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

const defaultWidth = 21;
const defaultHeight = 20;

type IconProps = SVGProps<SVGSVGElement>;
