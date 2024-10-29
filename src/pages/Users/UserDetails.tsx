import CustomModal from "@/components/CustomModal";
import { FormBuilder, FormDetails, TInputChange, TInputValidation } from "@/components/FormBuilder";
import { ModalActionProps } from "@/hooks/useModalActions";
import { useValidation } from "@/hooks/UseValidation";
import { RoleService } from "@/service/RoleService";
import { TUser, TUserRequestState, UserService } from "@/service/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { userModalActions } from ".";

export default function UserDetailsModal({ modalState: { open, data }, handleClose }: Readonly<DetailModalProps>) {
    const queryClient = useQueryClient();
    const [formValues, setFormValues] = useState<TUserRequestState>(initialValues);
    const { handleValidInput, checkValidate, isFormValid, resetForm } = useValidation(requiredFields);

    const userId = data?.id;

    const { data: roles = { data: [] } } = useQuery({
        queryKey: ["roles-list"],
        queryFn: async () => {
            const response = await RoleService.getAll();
            return response;
        },
    });

    const createFormMutation = useMutation({
        mutationFn: () => {
            const values = { ...formValues, roles: formValues.roles.map((role) => ({ id: role })) };
            return userId ? UserService.update(values) : UserService.create(values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users-list"] });
            handleCloseAndReset();
        },
    });

    useEffect(() => {
        if (data) {
            setFormValues({ ...data, roles: data.roles.map((role) => role.id) });
        }
    }, [data]);

    useEffect(() => {
        requiredFields.forEach((field) =>
            handleValidInput({
                key: field.key,
                isValid: !!formValues[field.key as keyof TUser],
            }),
        );
    }, [formValues, handleValidInput]);

    const onInputChange = function ({ key, value }: TInputChange) {
        setFormValues((currentState) => {
            return {
                ...currentState,
                [key]: value,
            };
        });
    };

    const handleSubmit = function () {
        const isValid = isFormValid({ informUser: true });
        if (!isValid) return false;

        createFormMutation.mutate();
    };

    const allRoles = useMemo(() => {
        if (!roles.data) return [];

        return roles.data.map((role) => ({
            label: role.name + " - " + role.operation,
            value: role.id,
            isChecked: true,
            checkedValue: formValues.roles?.includes(role.id),
            key: role.id,
        }));
    }, [formValues.roles, roles.data]);

    const handleCloseAndReset = useCallback(() => {
        setFormValues(initialValues);
        handleClose();
    }, [handleClose]);

    return (
        <CustomModal open={open} onCancel={handleCloseAndReset} title='İstifadəçi' onOk={handleSubmit}>
            <div className='user-detail-modal'>
                <FormBuilder
                    form={{
                        inputs: formFields.map((item) => ({
                            ...item,
                            checkValidate,
                            resetForm,
                            setIsValid: handleValidInput,
                        })),
                        onChange: (details) => onInputChange(details as TInputChange),
                        values: formValues,
                        options: { roles: allRoles },
                    }}
                />
            </div>
        </CustomModal>
    );
}

type DetailModalProps = ModalActionProps<userModalActions, TUser>;

const initialValues: TUserRequestState = {
    id: "",
    name: "",
    password: "",
    email: "",
    roles: [],
};

const formFields: Array<FormDetails> = [
    {
        label: "Ad",
        type: "text",
        key: "name",
        required: true,
    },
    {
        label: "Email",
        type: "text",
        key: "email",
        required: true,
        validator: "EmailValidator",
    },
    {
        label: "Parol",
        type: "text",
        key: "password",
        required: false,
    },
    {
        label: "Rollar",
        type: "select-multiple",
        key: "roles",
        required: false,
    },
];

const requiredFields: TInputValidation[] = [
    { key: "email", isValid: false },
    { key: "name", isValid: false },
];
