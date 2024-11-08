import { Loading } from "@/components/CustomLoading";
import { BuildingsService } from "@/service/BuildingsService";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import BuildingChart from "./BuildingChart";
import "./Statistics.scss";

const Statistics = () => {
    const navigate = useNavigate();

    const { data = { data: [] }, isLoading } = useQuery({
        queryKey: ["buildings-list"],
        queryFn: async () => {
            const response = await BuildingsService.getAll();
            return response;
        },
    });

    return isLoading ? (
        <Loading />
    ) : (
        <div className='flex-column gap-1 w-full'>
            <div className='flex gap-1 justify-between'>
                <Button className='default-btn' onClick={() => navigate(-1)}>
                    Geri
                </Button>
            </div>
            {data.data.map(({ company_id, id }) => (
                <BuildingChart company_id={company_id} key={id} />
            ))}
        </div>
    );
};

export default Statistics;
