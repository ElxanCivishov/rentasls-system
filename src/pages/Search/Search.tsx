import { ContentLoading, Loading } from "@/components/CustomLoading";
import CustomSwiper from "@/components/CustomSwiper";
import DownloadedDocumentsWrapper from "@/components/Upload/DownloadedDocumentsWrapper";
import { RoomsService } from "@/service/RoomsService";
import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import RoomInfo from "../Map/RoomInfo";
import "./Search.scss";
import { ROUTES } from "@/routes/consts";
import { FaArrowLeft } from "react-icons/fa6";

export default function Search() {
    const { search, company } = useParams();
    const navigate = useNavigate();

    const { data: roomDetails, isLoading } = useQuery({
        queryKey: ["room-details", search, company],
        queryFn: async () => (search ? RoomsService.getById({ roomId: search, companyId: company }) : null),
        enabled: !!search && !!company,
    });

    if (isLoading) return <Loading />;

    return (
        <div className='search-result-wrapper'>
            <Button type='primary' onClick={() => navigate(ROUTES.DASHBOARD.LINK)} icon={<FaArrowLeft />}>
                Binalar
            </Button>

            <h3>Axtarış nəticəsi</h3>

            <div className='details'>{isLoading ? <ContentLoading /> : roomDetails && <RoomInfo {...roomDetails?.data} />}</div>

            {roomDetails && (
                <>
                    {roomDetails?.data.contract?.files && roomDetails?.data.contract?.files?.length > 0 ? (
                        <DownloadedDocumentsWrapper otherFiles={roomDetails?.data.contract.files} otherTitle='Müqavilə  sənədləri' />
                    ) : (
                        <Card>
                            <b>Kontrakt üçün sənədlər yüklənməyib</b>
                        </Card>
                    )}
                    {roomDetails?.data.handover?.files && roomDetails?.data.handover?.files?.length > 0 ? (
                        <DownloadedDocumentsWrapper otherFiles={roomDetails?.data.handover?.files} otherTitle='Akt sənədləri' />
                    ) : (
                        <Card>
                            <b>Akt üçün sənədlər yüklənməyib</b>
                        </Card>
                    )}

                    <div className='w-full'>
                        <CustomSwiper files={roomDetails?.data?.files} />
                    </div>
                </>
            )}
        </div>
    );
}
