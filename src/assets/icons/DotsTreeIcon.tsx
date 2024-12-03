import { SVGProps } from "react";

export default function DotsTreeIcon({
    width = 28,
    height = 28,
    fill = "#3C7167",
    stroke = "#3C7167",
    rectColor = "#edf2f7",
    ...rest
}: Readonly<SVGProps<SVGSVGElement> & { rectColor?: string }>) {
    return (
        <div className='dots-icon'>
            <svg width={width} height={height} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
                <rect y='0.000976562' width={width} height={height} rx='6' fill={rectColor} />
                <path
                    d='M14.4375 14.001C14.4375 14.2426 14.2416 14.4385 14 14.4385C13.7584 14.4385 13.5625 14.2426 13.5625 14.001C13.5625 13.7594 13.7584 13.5635 14 13.5635C14.2416 13.5635 14.4375 13.7594 14.4375 14.001Z'
                    fill={fill}
                    stroke={stroke}
                />
                <path
                    d='M19.4375 14.001C19.4375 14.2426 19.2416 14.4385 19 14.4385C18.7584 14.4385 18.5625 14.2426 18.5625 14.001C18.5625 13.7594 18.7584 13.5635 19 13.5635C19.2416 13.5635 19.4375 13.7594 19.4375 14.001Z'
                    fill={fill}
                    stroke={stroke}
                />
                <path
                    d='M9.4375 14.001C9.4375 14.2426 9.24162 14.4385 9 14.4385C8.75838 14.4385 8.5625 14.2426 8.5625 14.001C8.5625 13.7594 8.75838 13.5635 9 13.5635C9.24162 13.5635 9.4375 13.7594 9.4375 14.001Z'
                    fill={fill}
                    stroke={stroke}
                />
            </svg>
        </div>
    );
}
