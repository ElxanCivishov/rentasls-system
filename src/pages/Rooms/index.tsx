import { CustomTable } from "@/components/CustomTable";
import { SearchFormWithNewBtn } from "@/components/SearchForm/SearchFormWithNewBtn";
import { useModalActions } from "@/hooks/useModalActions";
import { FloorsService } from "@/service/FloorsService";
import { RoomsService, TFilterRooms, TRoomDetails } from "@/service/RoomsService";
import { monthsOptions, yearOptions } from "@/utils/Date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { operationsColumns, searchFormFields } from "./consts";
import RoomDetails from "./RoomDetails";
import "./Rooms.scss";

const Rooms = () => {
    const navigate = useNavigate();
    const { building, company } = useParams<{ building: string; company: string }>();
    const [searchForm, setSearchForm] = useState<TFilterRooms>(initializeRequest);
    const { modalState, handleClose, handleOpen } = useModalActions<RoomDetailsModalActions, TRoomDetails>();

    const { data: floors = { data: [] }, isLoading: isLoadingFloors } = useQuery({
        queryKey: ["floors", building, company],
        queryFn: async () => {
            const response = await FloorsService.getAll({ buildingId: building!, companyId: company! });
            return response;
        },
    });

    const {
        data: rooms = { data: [] },
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["rooms", building, company, searchForm.floor_id],
        queryFn: async () => {
            const response = searchForm.floor_id ? RoomsService.getAll({ ...searchForm, companyId: company! }) : undefined;
            return response;
        },
        enabled: !!building || !!company,
    });

    const { mutate: deleteRoom } = useMutation({
        mutationFn: async (id: string) => await RoomsService.delete(id, company!),
        onSuccess: () => refetch(),
    });

    useEffect(() => {
        if (floors.data.length > 0) {
            setSearchForm((prev) => ({ ...prev, floor_id: floors.data[0].id }));
        }
    }, [floors]);

    const floorOptions = useMemo(() => floors.data.map(({ id, name }) => ({ value: id, key: id, label: name })), [floors]);
    const columns = useMemo(() => operationsColumns({ handleOpen, deleteRoom }), [deleteRoom, handleOpen]);

    if (!company) return;

    return (
        <div className='room-operations'>
            <div className='flex gap-1'>
                <Button className='default-btn' onClick={() => navigate(-1)}>
                    Geri
                </Button>
            </div>

            <SearchFormWithNewBtn
                formFields={searchFormFields}
                formValues={searchForm}
                setSearchForm={setSearchForm}
                options={{ month: monthsOptions, year: yearOptions, floor_id: floorOptions }}
                handleSubmit={refetch}
                onClearHandler={() => setSearchForm((prev) => ({ ...initializeRequest, floor_id: prev.floor_id }))}
            />

            <CustomTable scroll={{ x: 400 }} loading={isLoading || isLoadingFloors} columns={columns} data={rooms.data} pagination={false} />

            <RoomDetails modalState={modalState} handleClose={handleClose} companyId={company} />
        </div>
    );
};

export default Rooms;

const initializeRequest: TFilterRooms = {
    floor_id: "",
    year: new Date().getFullYear(),
    month: 10,
};

export type RoomDetailsModalActions = "new" | "edit" | null;
