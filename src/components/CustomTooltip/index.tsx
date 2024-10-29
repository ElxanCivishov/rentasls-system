import { Tooltip, TooltipProps } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import { themeConfig } from "../../theme.config";

export const CustomTooltip = function ({ position = "bottom", color = themeConfig.primary.main, children, ...rest }: CustomTooltipProps) {
    return (
        <Tooltip placement={position} color={color} {...rest}>
            {children}
        </Tooltip>
    );
};

type CustomTooltipProps = {
    children: JSX.Element[] | JSX.Element;
    position?: TooltipPlacement;
    сolor?: string;
} & TooltipProps;
