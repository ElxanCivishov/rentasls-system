import { InputValue } from "@/components/FormBuilder";
import { InputProps } from "antd";
import { FC, HTMLProps, useState } from "react";
import "./FloatingLabel.scss";

export type FloatLabelProps = HTMLProps<HTMLDivElement> & {
    children: JSX.Element | JSX.Element[];
    label?: string;
    value?: InputValue;
    specificText?: string | null;
    className?: InputProps["status"];
    isRequired?: boolean;
};

export const FloatLabel: FC<FloatLabelProps> = function ({ children, label, value, specificText, className, isRequired = false, ...rest }) {
    const [focus, setFocus] = useState(false);

    const labelClass = focus || value || value === 0 ? "label label-float" : "label";

    return (
        <div {...rest} className={`float-label withSpecificText ${className}`} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
            {children}
            {label && (
                <label className={labelClass}>
                    {label} {isRequired && <span className='required-star'>*</span>}
                </label>
            )}
            <span className='specific-text'>{specificText}</span>
        </div>
    );
};
