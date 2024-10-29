import { Segmented, SegmentedProps } from "antd";
import { useState } from "react";

function CustomSegmented({ options, activeIdx, ...rest }: CustomSegmentedProps) {
    const [selectedTab, setSelectedTab] = useState<string | number>(options[activeIdx]);

    return <Segmented options={options} type='number' size='small' value={selectedTab} onChange={setSelectedTab} {...rest} />;
}

export default CustomSegmented;

type CustomSegmentedProps = { activeIdx: number; options: string[] } & SegmentedProps & React.RefAttributes<HTMLDivElement>;
