import { CustomTooltip } from "@/components/CustomTooltip";
import { useUser } from "@/hooks/useUser";
import { ROLE_KEYWORDS } from "@/models/Roles";
import { ROUTES } from "@/routes/consts";
import { TBuilding } from "@/service/BuildingsService";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useMemo } from "react";
import { FaEdit, FaSitemap } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { MdDoorSliding } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BuildingDetailsModalActions } from ".";
import "./Dashboard.scss";

type BuildingProps = {
    building: TBuilding;
    handleOpen: (key: BuildingDetailsModalActions, data?: TBuilding) => void;
};

const Building = ({ building, handleOpen }: BuildingProps) => {
    const navigate = useNavigate();

    const { user, isAdmin } = useUser();

    const { address, name, company_id, id, properties } = building;

    const handleNavigation = useCallback(
        (path: string) => {
            if (company_id) navigate(`${path}${id}/${company_id}`);
        },
        [company_id, id, navigate],
    );

    const hasOperationRole = useMemo(() => {
        const hasRole = user?.roles.some((role) => role.building_id === id && role.operation === ROLE_KEYWORDS.ALL);
        return isAdmin || hasRole;
    }, [user?.roles, isAdmin, id]);

    return (
        <div className='building-card'>
            <Card bordered={false} cover={<img alt='building' src='https://i.pinimg.com/736x/a0/a7/46/a0a746eee27dcbd84359a5557e096da7.jpg' />}>
                <Meta title={name} description={address} />
                <div>
                    <div className='fields'>
                        {properties.map((property) => (
                            <p key={property.id}>
                                <b>{property.key}:</b> {property.value}
                            </p>
                        ))}
                    </div>

                    <div className='actions'>
                        <CustomTooltip title='Xəritə' key='map'>
                            <Button type='primary' onClick={() => handleNavigation(ROUTES.MAP.LINK)}>
                                <FaSitemap />
                                Xəritə
                            </Button>
                        </CustomTooltip>
                        {hasOperationRole && (
                            <CustomTooltip title='Yerlər' key='rooms'>
                                <Button type='primary' onClick={() => handleNavigation(ROUTES.ROOMS.LINK)}>
                                    <MdDoorSliding />
                                    Yerlər
                                </Button>
                            </CustomTooltip>
                        )}

                        <CustomTooltip key='statistics' title='Statistika'>
                            <Button type='primary' onClick={() => navigate(`${ROUTES.STATISTICS.STATISTIC.LINK}${company_id}`)}>
                                <FaChartSimple />
                                Statistika
                            </Button>
                        </CustomTooltip>
                        {hasOperationRole && (
                            <CustomTooltip key='edit' title='Redaktə'>
                                <Button type='primary' onClick={() => handleOpen("edit", building)}>
                                    <FaEdit />
                                    Redaktə
                                </Button>
                            </CustomTooltip>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Building;
