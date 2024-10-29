import { SVGProps } from "react";

export default function UsersIcon({ selected, ...rest }: SVGProps<SVGSVGElement> & { selected?: boolean }) {
    const activeColor = selected ? "#3c7167" : "#fff";

    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...rest}>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.592 13.2068C11.281 13.2068 14.434 13.7658 14.434 15.9988C14.434 18.2318 11.302 18.8068 7.592 18.8068C3.902 18.8068 0.75 18.2528 0.75 16.0188C0.75 13.7848 3.881 13.2068 7.592 13.2068Z'
                stroke={activeColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.59108 10.0198C5.16908 10.0198 3.20508 8.05676 3.20508 5.63476C3.20508 3.21276 5.16908 1.24976 7.59108 1.24976C10.0121 1.24976 11.9761 3.21276 11.9761 5.63476C11.9851 8.04776 10.0351 10.0108 7.62208 10.0198H7.59108Z'
                stroke={activeColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M14.4844 8.88153C16.0854 8.65653 17.3184 7.28253 17.3214 5.61953C17.3214 3.98053 16.1264 2.62053 14.5594 2.36353'
                stroke={activeColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M16.5957 12.7322C18.1467 12.9632 19.2297 13.5072 19.2297 14.6272C19.2297 15.3982 18.7197 15.8982 17.8957 16.2112'
                stroke={activeColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
