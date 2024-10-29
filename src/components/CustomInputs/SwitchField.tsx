import { ExtendedInputDetails } from "@/components/FormBuilder";
import { Switch } from "antd";
import { SwitchProps } from "antd/lib";
import { FC } from "react";

type CustomSwitchFieldProps = { inputDetails: Omit<ExtendedInputDetails, "type"> } & SwitchProps & { bordered?: boolean };

export const CustomSwitchField: FC<CustomSwitchFieldProps> = function ({ inputDetails, bordered = true, ...rest }) {
    const { label, value, key, onChange } = inputDetails;

    const determineClass = `custom-switch ${bordered ? "bordered" : ""}`;

    return (
        <div className={determineClass}>
            {label && <h3>{label}</h3>}
            <Switch
                checkedChildren='Bəli'
                unCheckedChildren='Xeyr'
                value={value}
                onChange={(val: boolean) => onChange({ key, value: val })}
                className='switch'
                {...rest}
            />
        </div>
    );
};
