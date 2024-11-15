import { CustomTooltip } from "@/components/CustomTooltip";
import { ROUTES } from "@/routes/consts";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { FaSitemap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type BuildingTerritoryProps = {
    building: TBuildingTerritory;
};

const BuildingTerritory = ({ building }: BuildingTerritoryProps) => {
    const navigate = useNavigate();

    const { address, name } = building;

    return (
        <div className='building-card'>
            <Card bordered={false} cover={<img alt='building' src='https://i.pinimg.com/736x/a0/a7/46/a0a746eee27dcbd84359a5557e096da7.jpg' />}>
                <Meta title={name} description={address} />
                <div className='territory-button'>
                    <CustomTooltip title='Xəritə' key='map'>
                        <Button type='primary' onClick={() => navigate(ROUTES.DASHBOARD.TERRITORY.LINK)} className='align-center gap-half'>
                            <FaSitemap />
                            Binalar
                        </Button>
                    </CustomTooltip>
                </div>
            </Card>
        </div>
    );
};

export default BuildingTerritory;

export type TBuildingTerritory = {
    id: string;
    name: string;
    address: string;
    company_id: string;
    is_erazi: boolean;
};
