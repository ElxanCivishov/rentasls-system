import { ROUTES } from "@/routes/consts";
import { RoomsService } from "@/service/RoomsService";
import { AutoComplete } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const navigate = useNavigate();

    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value) return;

        const response = await RoomsService.getBySearch(value);

        const data =
            response.data?.map(({ id, number, director, ...rest }) => {
                const labelValue = formatLabelValue(director, number, rest.floor?.building_name);

                return {
                    ...rest,
                    label: labelValue,
                    value: labelValue,
                    key: id,
                };
            }) || [];

        setOptions(data.length ? (data as DefaultOptionType[]) : []);
    }, 300);

    const handleSelect = (option: DefaultOptionType) => {
        navigate(`${ROUTES.SEARCH.LINK}${option.key}/${option.floor?.building.company_id}`);
    };

    return (
        <AutoComplete
            size='large'
            className='custom-autocomplete'
            onSelect={(_, option) => handleSelect(option)}
            onSearch={handleSearch}
            options={options}
            allowClear={true}
            placeholder='Axtarış edin...'
            dropdownStyle={{
                width: window.innerWidth < 768 ? "300px" : "800px",
                maxWidth: "100%",
            }}
            onClear={() => {
                setOptions([]);
            }}
        />
    );
}

// const formatLabelValue = (director?: string | null, number?: string | null, buildingName?: string | null): string => {
//     const directorPart = director || "";
//     const numberPart = number ? `(${number})` : "";
//     const buildingPart = buildingName || "";
//     return `${directorPart} ${numberPart} ${buildingPart}`.trim();
// };

const formatLabelValue = (director?: string | null, number?: string | null, buildingName?: string | null): string => {
    const parts = [director?.trim(), number ? `No: ${number.trim()}` : "", buildingName?.trim()];
    return parts.filter(Boolean).join(" - ");
};
