import { Loading } from "@/components/CustomLoading";
import { FloorsService } from "@/service/FloorsService";
import { TSvgElement } from "@/utils/svgFormat/svgFormat";
import { svgToNestedKeyValue } from "@/utils/svgFormat/svgToObject";
import { useQuery } from "@tanstack/react-query";
import { Button, message, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { svgMapFiles } from "./consts";
import "./Map.scss";
import MapItem from "./MapItem";

const Maps = () => {
    const navigate = useNavigate();
    const [activeFloor, setActiveFloor] = useState<string | null>(null);
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const currentMonth = new Date().getMonth() + 1;
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    const { building, company } = useParams<{ building: string; company: string }>();

    const { data: floors = { data: [] }, isLoading } = useQuery({
        queryKey: ["floors", building, company],
        queryFn: async () => {
            const response = await FloorsService.getAll({ buildingId: building!, companyId: company! });
            return response;
        },
    });

    const buildingName = floors?.data[0]?.building_name;

    useEffect(() => {
        if (floors.data.length > 0) {
            setActiveFloor(activeFloor || floors.data[0].id);
        }
    }, [floors, activeFloor]);

    const fetchSvg = async (svgPath: string) => {
        try {
            setLoading(true);
            const response = await fetch(svgPath);
            if (!response.ok) throw new Error("Failed to fetch SVG");
            const text = await response.text();
            setSvgContent(text);
        } catch (err) {
            message.error("Error loading SVG content");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeFloor) fetchSvg(svgMapFiles[activeFloor]);
    }, [activeFloor]);

    const convertToText = useMemo(() => {
        return svgContent ? svgToNestedKeyValue(svgContent) : null;
    }, [svgContent]);

    const monthOptions = useMemo(() => {
        const allMonths = [
            { value: 1, label: "Yanvar" },
            { value: 2, label: "Fevral" },
            { value: 3, label: "Mart" },
            { value: 4, label: "Aprel" },
            { value: 5, label: "May" },
            { value: 6, label: "İyun" },
            { value: 7, label: "İyul" },
            { value: 8, label: "Avqust" },
            { value: 9, label: "Sentyabr" },
            { value: 10, label: "Oktyabr" },
            { value: 11, label: "Noyabr" },
            { value: 12, label: "Dekabr" },
        ];
        return [
            { value: null, label: "Ay seç", disabled: true }, 
            ...allMonths.filter((month) => month.value <= currentMonth), 
        ];
    }, [currentMonth]);

    if (!activeFloor && !isLoading) {
        return <div>Mərtəbə seçilməlidir</div>;
    }

    return (
        <div className='map-wrapper'>
            <div className='actions'>
                <Button className='default-btn' onClick={() => navigate(-1)} style={{ marginRight: "4rem" }}>
                    Geri
                </Button>
                <h3>{buildingName}</h3>
                <div className='floors' style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Select
                        value={selectedMonth}
                        onChange={(value) => setSelectedMonth(value)}
                        options={monthOptions}
                        style={{ width: 120 }}
                        placeholder="Ay seç"
                    />
                    {floors.data.map(({ id, name }) => (
                        <Button
                            key={id}
                            type={id === activeFloor ? "primary" : "default"}
                            onClick={() => setActiveFloor(id)}
                        >
                            {name}
                        </Button>
                    ))}
                   
                </div>
            </div>
            {loading || isLoading ? (
                <Loading />
            ) : (
                convertToText && (
                    <MapItem
                        svgData={convertToText as TSvgElement}
                        activeFloor={activeFloor}
                        selectedMonth={selectedMonth} 
                    />
                )
            )}
        </div>
    );
};

export default Maps;