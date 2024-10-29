import { CustomSelectProps, InputValue } from "@/components/FormBuilder";
import { Card, Radio, RadioChangeEvent } from "antd";
import { RadioButtonProps } from "antd/lib/radio/radioButton";
import { FC } from "react";

const CustomRadioField: FC<CustomRadioFieldProps> = ({ inputDetails, title, gridCols = 2, withCard = true, ...rest }) => {
    const { options, key, onChange, value, disabled } = inputDetails;

    const handleChange = (value: InputValue) => {
        if (disabled) return;
        onChange({ key, value });
    };

    const content = (
        <div>
            {title && <h3 className='form-title'>{title}</h3>}
            <Radio.Group
                onChange={(e: RadioChangeEvent) => handleChange(e.target.value)}
                value={value}
                disabled={disabled}
                className='w-full'
                {...rest}
            >
                <div className={`grid-data-${gridCols}`}>
                    {options.map((option) => (
                        <button className='custom-radio-wrapper' onClick={() => handleChange(option.value)} key={option.key}>
                            <h3>{option.label}</h3>
                            <Radio value={option.value} disabled={disabled} />
                        </button>
                    ))}
                </div>
            </Radio.Group>
        </div>
    );

    const renderOptions = withCard ? <Card>{content}</Card> : content;

    return options ? renderOptions : null;
};

export default CustomRadioField;

type CustomRadioFieldProps = {
    inputDetails: CustomSelectProps;
    gridCols?: number;
    withCard?: boolean;
    title?: string;
} & RadioButtonProps;
