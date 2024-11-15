import { Loading } from "@/components/CustomLoading";
import { useModalActions } from "@/hooks/useModalActions";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/routes/consts";
import { BuildingsService, TBuilding } from "@/service/BuildingsService";
import { useQuery } from "@tanstack/react-query";
import { Button, Empty } from "antd";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Building from "./Building";
import BuildingDetails from "./BuildingDetails";
import BuildingTerritory from "./BuildingTerritory";
import { territoryBuilding } from "./consts";
import "./Dashboard.scss";

const Dashboard = () => {
    const { pathname } = useLocation();
    const { user, isAdmin } = useUser();
    const navigate = useNavigate();
    const isTerritory = pathname === ROUTES.DASHBOARD.TERRITORY.LINK;

    const { modalState, handleClose, handleOpen } = useModalActions<BuildingDetailsModalActions, TBuilding>();

    const { data = { data: [] }, isLoading } = useQuery({
        queryKey: ["buildings-list"],
        queryFn: async () => {
            const response = await BuildingsService.getAll();
            return response;
        },
    });

    const parsedBuildings = useMemo(() => {
        const isEraziTrue = data.data.filter((building) => building.is_erazi);
        const isEraziFalse = data.data.filter((building) => !building.is_erazi);

        return isTerritory ? isEraziTrue : isEraziFalse;
    }, [data.data, isTerritory]);

    const isShowTerritoryCard = useMemo(() => user?.roles.some((role) => isTerritoryAccessRolesIds.includes(role.id)), [user?.roles]);

    return isLoading ? (
        <Loading />
    ) : (
        <div className='flex-column gap-1 w-full'>
            {isTerritory && (
                <div>
                    <Button className='default-btn' onClick={() => navigate(-1)}>
                        Geri
                    </Button>
                </div>
            )}

            {parsedBuildings.length === 0 && <Empty description='Məlumat tapılmadı' />}

            <div className='building-cards'>
                {!isTerritory && (isShowTerritoryCard || isAdmin) && <BuildingTerritory building={territoryBuilding} />}

                {parsedBuildings.map((building) => (
                    <Building key={building.id} building={building} handleOpen={handleOpen} />
                ))}
            </div>
            <BuildingDetails modalState={modalState} handleClose={handleClose} />
        </div>
    );
};

export default Dashboard;
export type BuildingDetailsModalActions = "edit" | null;

const isTerritoryAccessRolesIds = [
    "01JBE41MQP7W5KC57VRZRBAH24",
    "01JBE41MQS7A53485DM1RACD03",
    "01JBE41MR6Q2FKYJXMSSJZF3ZK",
    "01JBE41MR8GQZZRAAY2M7F0NA0",
    "01JBE41MR92FEK19BGTC0K3FGN",
    "01JBE41MRBJY4ADWDQJQNVR9QZ",
];
