import { SVGProps } from "react";

export default function DownloadIcon({ stroke = "#3C7167", ...rest }: Readonly<IconProps>) {
    return (
        <svg width={defaultWidth} height={defaultHeight} viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
            <path d='M12.1222 15.936L12.1222 3.89502' stroke={stroke} strokeLinecap='round' strokeLinejoin='round' />
            <path d='M15.0382 13.0083L12.1222 15.9363L9.20621 13.0083' stroke={stroke} strokeLinecap='round' strokeLinejoin='round' />
            <path
                d='M16.7549 8.62793H17.6879C19.7229 8.62793 21.3719 10.2769 21.3719 12.3129V17.1969C21.3719 19.2269 19.7269 20.8719 17.6969 20.8719L6.55695 20.8719C4.52195 20.8719 2.87195 19.2219 2.87195 17.1869V12.3019C2.87195 10.2729 4.51795 8.62793 6.54695 8.62793L7.48895 8.62793'
                stroke={stroke}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

type IconProps = SVGProps<SVGSVGElement>;
const defaultWidth = 28;
const defaultHeight = 28;
