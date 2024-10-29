import ArrowClockwise from "@/assets/icons/ArrowClockwise";
import PlusIcon from "@/assets/icons/PlusIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import { FormBuilder, FormDetails, TInputChange } from "@/components/FormBuilder";
import { Button, Form, FormProps } from "antd";
import { Dispatch, SetStateAction, useCallback } from "react";
import toast from "react-hot-toast";
import { CustomTooltip } from "../CustomTooltip";
import "./SearchForm.scss";

export const SearchFormWithNewBtn = function <T>({
    formValues,
    setSearchForm,
    handleSubmit,
    onClearHandler,
    onHandleNew,
    options,
    disabled,
    formFields,
    ...rest
}: SearchFormWithNewBtnProps<T>) {
    const handleChange = useCallback(({ key, value }: TInputChange) => setSearchForm((prev) => ({ ...prev, [key]: value })), [setSearchForm]);

    return (
        <Form
            className='flex gap-1 items-end search-and-new'
            onFinish={() => {
                const hasSearchValues = Object.values(formValues).some((value) => value);
                if (!hasSearchValues) {
                    toast.dismiss();
                    toast.error("Axtarış üçün məlumatları daxil edin.");
                    return;
                }
                handleSubmit?.();
            }}
            {...rest}
        >
            <FormBuilder
                form={{
                    inputs: formFields,
                    onChange: (details) => handleChange(details as TInputChange),
                    values: formValues,
                    options,
                }}
            />

            <div className='search-buttons'>
                {handleSubmit && (
                    <CustomTooltip title='Axtar'>
                        <Button htmlType='submit' disabled={disabled} icon={<SearchIcon height='20' width='20' />} />
                    </CustomTooltip>
                )}

                {onClearHandler && (
                    <CustomTooltip title='Yenilə'>
                        <Button disabled={disabled} onClick={onClearHandler} icon={<ArrowClockwise />} />
                    </CustomTooltip>
                )}
            </div>

            {onHandleNew && (
                <Button onClick={onHandleNew} className='default-btn' icon={<PlusIcon height='20' width='20' />}>
                    Yeni
                </Button>
            )}
        </Form>
    );
};

type SearchFormWithNewBtnProps<T> = {
    formValues: any;
    setSearchForm: Dispatch<SetStateAction<T>>;
    options?: any;
    formFields: FormDetails[];
    handleSubmit?: () => void;
    onHandleNew?: () => void;
    onClearHandler?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
} & FormProps;
