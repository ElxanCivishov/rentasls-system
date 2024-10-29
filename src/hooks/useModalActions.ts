import { useCallback, useState } from "react";

export interface ModalActionState<T, DataType> {
    open: boolean;
    key: T | null;
    data?: DataType;
}

export type ModalActionProps<T, DataType = null> = {
    modalState: ModalActionState<T, DataType>;
    handleClose: () => void;
    handleOpen?: (key: T, data?: DataType) => void;
};

export const initialModalActionState: ModalActionState<any, any> = { open: false, key: null, data: null };

export function useModalActions<T, DataType = null>(initialState: ModalActionState<T, DataType> = initialModalActionState) {
    const [modalState, setModalState] = useState<ModalActionState<T, DataType>>(initialState);

    const handleOpen = useCallback((key: T, data: DataType | any = null) => {
        setModalState({ key, open: !!key, data });
    }, []);

    const handleClose = useCallback((initialState: ModalActionState<T, DataType> = initialModalActionState) => {
        setModalState(initialState);
    }, []);

    return {
        modalState,
        handleOpen,
        handleClose,
    };
}
