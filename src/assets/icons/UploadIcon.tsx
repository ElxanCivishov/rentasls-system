import { SVGProps } from "react";

export default function UploadIcon({ stroke = "#3c7167", ...rest }: Readonly<IconProps>) {
    return (
        <svg width={defaultWidth} height={defaultHeight} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
            <path
                d='M5.15888 6.48661H4.38138C2.68555 6.48661 1.31055 7.86161 1.31055 9.55744L1.31055 13.6199C1.31055 15.3149 2.68555 16.6899 4.38138 16.6899H13.6564C15.3522 16.6899 16.7272 15.3149 16.7272 13.6199V9.54911C16.7272 7.85827 15.3564 6.48661 13.6655 6.48661H12.8797'
                stroke={stroke}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path d='M9.01823 0.825208V10.8594' stroke={stroke} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path
                d='M6.58984 3.26562L9.01901 0.825625L11.449 3.26563'
                stroke={stroke}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

const defaultWidth = 24;
const defaultHeight = 24;

type IconProps = SVGProps<SVGSVGElement>;
