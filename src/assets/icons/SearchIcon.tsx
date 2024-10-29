import { InputProps } from "antd";
import { SVGProps } from "react";
import { themeConfig } from "../../theme.config";

export default function SearchIcon({ status, color, ...restProps }: IconProps) {
    const pathColor = status === "error" ? "#FE7263" : color ?? themeConfig.primary.main;

    return (
        <svg
            width={defaultWidth}
            height={defaultHeight}
            viewBox='0 0 24 24'
            fill={status === "error" ? "#FE72630F" : "none"}
            xmlns='http://www.w3.org/2000/svg'
            {...restProps}
        >
            <circle cx='11.7669' cy='11.7666' r='8.98856' stroke={pathColor} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M18.0186 18.4851L21.5426 22' stroke={pathColor} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

const defaultWidth = 28;
const defaultHeight = 28;

type IconProps = SVGProps<SVGSVGElement> & { status?: InputProps["status"]; color?: string };
