export const convertToText = ({ dynamicNames, item, maxlength = 9 }: ConvertToTextProps): JSX.Element[] | string => {
    const field = dynamicNames.find((i) => i?.uid === item?.uid);

    if (!field) return "";

    const { x1, x2, y1, y2 } = field;

    if (field?.company_name?.trim()) {
        const words = field.company_name
            .trim()
            .split(" ")
            .map((word, index) => {
                if (word.length >= maxlength) {
                    const firstPart = word.slice(0, Math.ceil(word.length / 2));
                    const secondPart = word.slice(Math.ceil(word.length / 2));

                    return (
                        <tspan key={index}>
                            <tspan x={x1} dy={index > 0 ? y1 : y2}>
                                {firstPart + "-"}
                            </tspan>
                            <tspan x={x1} dy={y1}>
                                {secondPart}
                            </tspan>
                        </tspan>
                    );
                } else {
                    return (
                        <tspan key={index} x={index > 0 || word.length < 5 ? x1 : x2} dy={index > 0 ? y1 : y2}>
                            {word}
                        </tspan>
                    );
                }
            });

        return words;
    } else {
        return "Boş zona"
            .trim()
            .split(" ")
            .map((word, index) => {
                return (
                    <tspan style={{ fill: "red" }} key={index} x={x1} dy={index > 0 ? y1 : y2}>
                        {word}
                    </tspan>
                );
            });
    }
};

interface DynamicName {
    uid: string;
    company_name?: string | null;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

interface ConvertToTextProps {
    dynamicNames: DynamicName[];
    item: { uid: string };
    maxlength?: number;
}
