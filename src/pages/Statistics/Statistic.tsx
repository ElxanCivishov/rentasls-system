import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BuildingChart from "./BuildingChart";

const Statistic = () => {
    const navigate = useNavigate();
    const { company } = useParams<{ company: string }>();

    if (!company) return <div>Açar sözə uyğun bina məlumatları tapılmadı: {company}</div>;

    return (
        <div className='flex-column gap-1 w-full'>
            <div>
                <Button className='default-btn' onClick={() => navigate(-1)}>
                    Geri
                </Button>
            </div>
            <BuildingChart company_id={company} />
        </div>
    );
};

export default Statistic;
