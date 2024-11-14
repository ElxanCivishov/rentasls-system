import { Loading } from "@/components/CustomLoading";
import { StatisticsService } from "@/service/StatisticsService";
import { useQuery } from "@tanstack/react-query";
import BuildingChart from "./BuildingChart";
import "./Statistics.scss";

const BuildingsCharts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["all-buildings-data"],
        queryFn: async () => {
            const response = await StatisticsService.getAll();
            return response;
        },
    });

    if (isLoading) return <Loading />;

    const buildings = data?.data;

    if (!buildings) return;
    return buildings.map((statistics) => <BuildingChart statistics={statistics} key={statistics.building_name} />);
};

export default BuildingsCharts;
