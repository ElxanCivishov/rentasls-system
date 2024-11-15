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

type BuildingProps = {
    building: TBuilding;
    handleOpen: (key: BuildingDetailsModalActions, data?: TBuilding) => void;
};

const Building = ({ building, handleOpen }: BuildingProps) => {
    const navigate = useNavigate();

    const { user, isAdmin } = useUser();

    const {
        address,
        name,
        number_of_empty_rooms = 0,
        number_of_floors = 0,
        number_of_rent_rooms = 0,
        number_of_rooms = 0,
        area_of_empty_rooms = 0,
        area_of_rooms,
        company_id,
        area_of_rent_rooms,
        id,
    } = building;

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
                    <p>{`Mərtəbə sayı: ${number_of_floors}`}</p>

                    <Details
                        totalRooms={number_of_rooms}
                        numberOfRoomsForRent={number_of_rent_rooms}
                        emptyRooms={number_of_empty_rooms}
                        totalArea={area_of_rooms}
                        areaOfRoomsForRent={area_of_rent_rooms}
                        areaEmptyRooms={area_of_empty_rooms}
                    />

                    <div className='actions'>
                        <CustomTooltip title='Xəritə' key='map'>
                            <Button type='primary' onClick={() => handleNavigation(ROUTES.MAP.LINK)}>
                                <FaSitemap />
                                Xəritə
                            </Button>
                        </CustomTooltip>
                        {hasOperationRole && (
                            <CustomTooltip title='Otaqlar' key='rooms'>
                                <Button type='primary' onClick={() => handleNavigation(ROUTES.ROOMS.LINK)}>
                                    <MdDoorSliding />
                                    Otaqlar
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

interface DetailsProps {
    totalRooms: number;
    numberOfRoomsForRent: number;
    emptyRooms: number;
    totalArea: string;
    areaOfRoomsForRent: string;
    areaEmptyRooms: number;
}

const Details: React.FC<DetailsProps> = ({ totalRooms, numberOfRoomsForRent, emptyRooms, totalArea, areaOfRoomsForRent, areaEmptyRooms }) => {
    return (
        <div className='statistics'>
            <div className='description'>
                <p>
                    Otaq sayı: <span>{totalRooms}</span>
                </p>
                <p>
                    Dolu: <span>{numberOfRoomsForRent}</span>
                </p>
                <p>
                    Boş: <span>{emptyRooms}</span>
                </p>
            </div>
            <div className='description'>
                <p>
                    Sahəsi: <span>{totalArea} kv.m</span>
                </p>
            </div>
            <div className='description'>
                <p>
                    Dolu: <span>{areaOfRoomsForRent} kv.m</span>
                </p>
                <p>
                    Boş: <span>{areaEmptyRooms} kv.m</span>
                </p>
            </div>
        </div>
    );
};
