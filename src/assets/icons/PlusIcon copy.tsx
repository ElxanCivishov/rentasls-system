import { SVGProps } from "react";

export default function PlusIcon({ height = "16", width = "16", ...rest }: SVGProps<SVGSVGElement>) {
    return (
        <svg width={height} height={width} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
            <path d='M2.5 8H13.5' stroke='#3C7167' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M8 2.5V13.5' stroke='#3C7167' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
