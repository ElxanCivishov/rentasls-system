import CustomModal from "@/components/CustomModal";
import { FormBuilder, FormDetails, TInputChange, TInputValidation } from "@/components/FormBuilder";
import { ModalActionProps } from "@/hooks/useModalActions";
import { useValidation } from "@/hooks/UseValidation";
import { BuildingsService, TBuilding, TUpdateBuildingRequest } from "@/service/BuildingsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { BuildingDetailsModalActions } from ".";

export default function BuildingDetails({ modalState: { open, key, data }, handleClose }: Readonly<DetailModalProps>) {
    const queryClient = useQueryClient();

    const [formValues, setFormValues] = useState<TUpdateBuildingRequest>(initialData);
    const { handleValidInput, isFormValid, checkValidate } = useValidation(requiredFields);

    useEffect(() => {
        if (data) setFormValues({ name: data.name, address: data.address });
    }, [data]);

    useEffect(() => {
        requiredFields.forEach((field) => {
            const isValid = !!formValues[field.key as keyof TUpdateBuildingRequest];
            handleValidInput({ key: field.key, isValid });
        });
    }, [formValues, handleValidInput]);

    const createFormMutation = useMutation({
        mutationFn: async () =>
            await (data?.id ? BuildingsService.update({ buildingId: data.id, companyId: data.company_id, content: formValues }) : undefined),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["buildings-list"] });
            handleClose();
        },
    });

    const onInputChange = useCallback(({ key, value }: TInputChange) => setFormValues((prev: any) => ({ ...prev, [key]: value })), []);

    const handleSubmit = async () => {
        const isValid = isFormValid({ informUser: true });
        if (!isValid) return false;

        createFormMutation.mutateAsync();
    };

    return (
        <CustomModal open={open && key === "edit"} onCancel={handleClose} title='Məlumatlar' onOk={handleSubmit} width={600}>
            <div className='flex-column gap-1'>
                <FormBuilder
                    form={{
                        inputs: formInfoInputs.map((item) => ({
                            ...item,
                            checkValidate,
                            setIsValid: handleValidInput,
                        })),
                        onChange: (details) => onInputChange(details as TInputChange),
                        values: formValues,
                        options: {},
                    }}
                />
            </div>
        </CustomModal>
    );
}

type DetailModalProps = ModalActionProps<BuildingDetailsModalActions, TBuilding>;

const initialData: TUpdateBuildingRequest = {
    name: "",
    address: "",
};

const formInfoInputs: Array<FormDetails> = [
    {
        label: "Adı",
        key: "name",
        type: "text",
        required: true,
    },
    {
        label: "Ünvan",
        key: "address",
        type: "text",
        required: true,
    },
];

const requiredFields: TInputValidation[] = [
    { key: "name", isValid: false },
    { key: "address", isValid: false },
];
