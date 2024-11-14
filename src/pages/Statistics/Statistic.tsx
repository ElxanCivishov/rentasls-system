import { Loading } from "@/components/CustomLoading";
import { StatisticsService } from "@/service/StatisticsService";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BuildingChart from "./BuildingChart";

const Statistic = () => {
    const navigate = useNavigate();
    const { company } = useParams<{ company: string }>();

    const { data: statisticsData, isLoading } = useQuery({
        queryKey: ["buildings-chart", company],
        queryFn: async () => await StatisticsService.getById(company),
    });

    if (isLoading) return <Loading />;

    if (!company) return <div>Açar sözə uyğun bina məlumatları tapılmadı: {company}</div>;

    return (
        <div className='flex-column gap-1 w-full'>
            <div>
                <Button className='default-btn' onClick={() => navigate(-1)}>
                    Geri
                </Button>
            </div>
            <BuildingChart statistics={statisticsData?.data} />
        </div>
    );
};

export default Statistic;
