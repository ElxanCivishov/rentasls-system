import { Loading } from "@/components/CustomLoading";
import { useModalActions } from "@/hooks/useModalActions";
import { ROUTES } from "@/routes/consts";
import { BuildingsService, TBuilding } from "@/service/BuildingsService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Building from "./Building";
import BuildingDetails from "./BuildingDetails";
import BuildingTerritory from "./BuildingTerritory";
import { territoryBuilding } from "./consts";
import "./Dashboard.scss";
import { Button } from "antd";

const Dashboard = () => {
    const { pathname } = useLocation();
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

    return isLoading ? (
        <Loading />
    ) : (
        <div className='flex-column gap-1 w-full'>
            <div>
                <Button className='default-btn' onClick={() => navigate(-1)}>
                    Geri
                </Button>
            </div>
            <div className='building-cards'>
                {!isTerritory && <BuildingTerritory building={territoryBuilding} />}

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
