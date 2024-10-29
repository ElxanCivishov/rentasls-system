import { TInputValidation } from "@/components/FormBuilder";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useValidation = (initialState: TInputValidation[] = []) => {
    const [isValidInputs, setIsValidInputs] = useState<TInputValidation[]>(initialState);
    const [checkValidate, setCheckValidate] = useState<boolean>(false);
    const [resetForm, setResetForm] = useState<boolean>(false);

    const handleValidInput = useCallback(
        ({ key, isValid }: TInputValidation) => {
            setIsValidInputs((prev) => {
                const keyExists = prev.some((item) => item.key === key);

                if (keyExists) {
                    return prev.map((item) => (item.key === key ? { key, isValid } : item));
                } else {
                    return [...prev, { key, isValid }];
                }
            });
        },
        [setIsValidInputs],
    );

    const isFormValid = useCallback(
        ({ informUser = false, keysToCheck = [], message }: isFormValidType) => {
            const filteredInputs = keysToCheck.length > 0 ? isValidInputs.filter((input) => !keysToCheck.includes(input.key)) : isValidInputs;

            const isEveryValid = filteredInputs.every((input) => input.isValid);

            setCheckValidate(true);

            if (!isEveryValid) {
                if (informUser) {
                    toast.dismiss();
                    toast.error(message ?? "Qeyd olunan xanalar boş buraxıla bilməz");
                }
                return false;
            }

            return true;
        },
        [isValidInputs],
    );

    const resetValidations = useCallback(() => {
        setIsValidInputs(initialState);
        setCheckValidate(false);
    }, [initialState]);

    const toggleCheckValidate = useCallback(() => setCheckValidate((prev) => !prev), []);
    const toggleResetForm = useCallback(() => setResetForm((prev) => !prev), []);

    return {
        isValidInputs,
        checkValidate,
        resetForm,
        handleValidInput,
        setCheckValidate,
        isFormValid,
        resetValidations,
        toggleCheckValidate,
        toggleResetForm,
    };
};

export type isFormValidType = { informUser: boolean; keysToCheck?: string[]; message?: string };
