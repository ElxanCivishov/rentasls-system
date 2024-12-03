import AddNewRowButton from "@/components/Buttons/AddNewRowButton";
import { DeleteRowButton } from "@/components/Buttons/DeleteRowButton";
import { CustomTextField } from "@/components/CustomInputs/TextField";
import CustomModal from "@/components/CustomModal";
import { FormBuilder, FormDetails, TInputChange, TInputValidation } from "@/components/FormBuilder";
import { ModalActionProps } from "@/hooks/useModalActions";
import { useValidation } from "@/hooks/UseValidation";
import { BuildingsService, TBuilding, TUpdateBuildingRequest } from "@/service/BuildingsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BuildingDetailsModalActions } from ".";

export default function BuildingDetails({ modalState: { open, key, data }, handleClose }: Readonly<DetailModalProps>) {
    const queryClient = useQueryClient();

    const [formValues, setFormValues] = useState<TUpdateBuildingRequest>(initialData);
    const { handleValidInput, isFormValid, checkValidate } = useValidation(requiredFields);

    useEffect(() => {
        if (data) setFormValues({ name: data.name, address: data.address, properties: data.properties });
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

    const onChange = (details: { key: string; value: string }, index: number) => {
        setFormValues((prevData) => {
            const { properties } = prevData;

            const updatedFields = [
                ...properties.slice(0, index),
                { ...properties[index], [details.key]: details.value },
                ...properties.slice(index + 1),
            ];

            return { ...prevData, properties: updatedFields };
        });
    };

    const addNewRow = function () {
        const { properties } = formValues;
        const isNameEmpty = properties.some((field) => field.value === "");
        if (isNameEmpty) {
            toast.error("Xana doldurulmamış yenisi əlavə edilə bilməz");
            return;
        }
        setFormValues((prev) => ({
            ...prev,
            properties: [...prev.properties, { key: "", value: "" }],
        }));
    };

    const deleteRow = (index: number) => {
        setFormValues((prev) => {
            const updatedFields = [...prev.properties];
            updatedFields.splice(index, 1);
            return { ...prev, properties: updatedFields };
        });
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

            <div className='flex-column gap-1 '>
                <div className='flex-column gap-1 w-full'>
                    {formValues.properties.map((field, index) => {
                        const uIdx = index.toString();
                        return (
                            <div className='flex gap-1 w-full' key={uIdx}>
                                <div className='flex gap-1 w-full'>
                                    <CustomTextField
                                        inputDetails={{
                                            key: "key",
                                            onChange: (details) => onChange(details, index),
                                            type: "text",
                                            value: field.key,
                                            label: "Başlıq",
                                            maxLength: 250,
                                        }}
                                        size='small'
                                    />

                                    <CustomTextField
                                        inputDetails={{
                                            key: "value",
                                            onChange: (details) => onChange(details, index),
                                            type: "text",
                                            value: field.value,
                                            label: "Dəyər",
                                            maxLength: 250,
                                        }}
                                        size='small'
                                    />
                                </div>
                                {formValues.properties.length > 0 && <DeleteRowButton onClick={() => deleteRow(index)} />}
                            </div>
                        );
                    })}
                </div>
                <AddNewRowButton onClick={() => addNewRow()}>Yenisini əlavə edin</AddNewRowButton>
            </div>
        </CustomModal>
    );
}

type DetailModalProps = ModalActionProps<BuildingDetailsModalActions, TBuilding>;

const initialData: TUpdateBuildingRequest = {
    name: "",
    address: "",
    properties: [],
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
