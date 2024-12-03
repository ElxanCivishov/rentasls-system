import { DeleteIcon } from "@/assets/icons";
import MinusIcon, { IconShape } from "@/assets/icons/Minus";
import { CustomTooltip } from "@/components/CustomTooltip";
import { HTMLProps } from "react";
import { themeConfig } from "../../theme.config";
import "./Buttons.scss";

export const DeleteRowButton = function ({
    tooltipText = "Sil",
    shape,
    isTrash = false,
    width = 36,
    height = 36,
    type = "button",
    ...rest
}: DeleteRowButtonProps) {
    const determineIcon = isTrash ? <DeleteIcon width={width} height={height} /> : <MinusIcon shape={shape} width={width} height={height} />;

    return (
        <CustomTooltip color={themeConfig.error} title={tooltipText}>
            <button type={type} className='row-btn' {...rest}>
                {determineIcon}
            </button>
        </CustomTooltip>
    );
};

type DeleteRowButtonProps = HTMLProps<HTMLButtonElement> & {
    tooltipText?: string;
    shape?: IconShape;
    isTrash?: boolean;
    type?: "button" | "submit" | "reset";
};
