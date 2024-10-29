import { Loading } from "@/components/CustomLoading";
import { useModalActions } from "@/hooks/useModalActions";
import { BuildingsService, TBuilding } from "@/service/BuildingsService";
import { useQuery } from "@tanstack/react-query";
import Building from "./Building";
import BuildingDetails from "./BuildingDetails";
import "./Dashboard.scss";

const Dashboard = () => {
    const { modalState, handleClose, handleOpen } = useModalActions<BuildingDetailsModalActions, TBuilding>();

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
        <>
            <div className='building-cards'>
                {data.data.map((building) => (
                    <Building key={building.id} building={building} handleOpen={handleOpen} />
                ))}
            </div>
            <BuildingDetails modalState={modalState} handleClose={handleClose} />
        </>
    );
};

export default Dashboard;
export type BuildingDetailsModalActions = "edit" | null;
