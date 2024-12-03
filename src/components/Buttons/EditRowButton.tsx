import { EditIcon } from "@/assets/icons";
import { CustomTooltip } from "@/components/CustomTooltip";
import { HTMLProps } from "react";
import { themeConfig } from "../../theme.config";
import "./Buttons.scss";

export const EditRowButton = function ({ tooltipText = "Yenilə", type = "button", ...rest }: EditRowButtonProps) {
    return (
        <CustomTooltip color={themeConfig.primary.main} title={tooltipText}>
            <button type={type} className='row-btn' {...rest}>
                <EditIcon />
            </button>
        </CustomTooltip>
    );
};

type EditRowButtonProps = HTMLProps<HTMLButtonElement> & { tooltipText?: string; type?: "button" | "submit" | "reset" };
