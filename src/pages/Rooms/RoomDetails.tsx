import CustomModal from "@/components/CustomModal";
import { FormBuilder, FormDetails, TInputChange } from "@/components/FormBuilder";
import UploadImages from "@/components/Upload/UploadImages";
import { ModalActionProps } from "@/hooks/useModalActions";
import { RoomsService, TRoomDetails, TRoomDetailsRequest } from "@/service/RoomsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { RoomDetailsModalActions } from ".";
import "./Rooms.scss";

export default function RoomDetails({ modalState: { open, key, data }, companyId, handleClose }: DetailModalProps) {
    const queryClient = useQueryClient();

    const [roomDetails, setRoomDetails] = useState<TRoomDetailsRequest>(initialData);

    useEffect(() => {
        if (data) {
            setRoomDetails({ ...data, contract_number: data.contract.number });
        }
    }, [data, companyId]);

    const createFormMutation = useMutation({
        mutationFn: async () => {
            return await (data?.id && companyId ? RoomsService.update({ roomId: data.id, companyId, content: roomDetails }) : undefined);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            handleClose();
        },
    });

    const onInputChange = useCallback(({ key, value }: TInputChange) => setRoomDetails((prev: any) => ({ ...prev, [key]: value })), []);

    const handleSubmit = async () => {
        createFormMutation.mutateAsync();
    };

    return (
        <CustomModal open={open && key === "edit"} onCancel={handleClose} title='Otaq məlumatları' onOk={handleSubmit} width={1300}>
            <div className='room-details-wrapper'>
                <div className='inputs-wrapper'>
                    <FormBuilder
                        form={{
                            inputs: formInfoInputs,
                            onChange: (details) => onInputChange(details as TInputChange),
                            values: roomDetails,
                            options: {},
                        }}
                    />
                </div>
                <UploadImages roomKey={roomDetails.id} companyId={companyId} />
            </div>
        </CustomModal>
    );
}

type DetailModalProps = ModalActionProps<RoomDetailsModalActions, TRoomDetails> & { companyId: string };

const initialData: TRoomDetailsRequest = {
    id: "",
    floor_id: "",
    director: "",
    official_payment: null,
    unofficial_payment: null,
    voen_or_fin: "",
    area: null,
    price_per_square_meter: null,
    rent_amount: null,
    number: "",
    type: "",
    debt: null,
    total_debt: null,
    contract_number: "",
    renter_name: "",
    roomId: "",
    companyId: "",
    key_for_svg: "",
};

const formInfoInputs: Array<FormDetails> = [
    {
        label: "Otaq no",
        key: "number",
        type: "text",
    },

    {
        label: "Müəssisənin adı",
        key: "renter_name",
        type: "text",
    },

    {
        label: "Direktor",
        key: "director",
        type: "text",
    },
    {
        label: "Ümumi sahəsi kv.m:",
        key: "area",
        type: "number",
    },
    {
        label: "1 kv.m dəyəri:",
        key: "price_per_square_meter",
        type: "number",
    },
    {
        label: "İcra haqqının dəyəri:",
        key: "rent_amount",
        type: "number",
    },
    {
        label: "Borc:",
        key: "debt",
        type: "number",
    },
    {
        label: "Rəsmi ödəniş:",
        key: "official_payment",
        type: "number",
    },
    {
        label: "Qeyri-rəsmi ödəniş:",
        key: "unofficial_payment",
        type: "number",
    },
    {
        label: "VÖEN/FİN:",
        key: "voen_or_fin",
        type: "text",
    },
    {
        label: "Kontrakt No:",
        key: "contract_number",
        type: "text",
    },
    {
        label: "Məkan növü:",
        key: "type",
        type: "text",
    },
    {
        label: "Svg uuid:",
        key: "key_for_svg",
        type: "text",
    },
];
