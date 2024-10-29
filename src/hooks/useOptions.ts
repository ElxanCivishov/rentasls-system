import { useCallback, useEffect, useState } from "react";

const useOptions = (
    services: { key: string; serviceFunction: ServiceFunction; valueKey?: string; labelKey?: string; notDisabled?: boolean }[],
    disabled: boolean = false,
) => {
    const [options, setOptions] = useState<OptionsState>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const getOptions = useCallback(async () => {
        try {
            const results = await Promise.all(services.map((service) => service.serviceFunction()));
            const newOptions: OptionsState = {};
            services.forEach(
                (service, index) =>
                    (newOptions[service.key] = results[index].map((item: any) => ({
                        key: item.id,
                        ...item,
                        value: item[service.valueKey ?? "id"],
                        label: item[service.labelKey ?? "name"],
                    }))),
            );
            setOptions(newOptions);
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [services]);

    useEffect(() => {
        if (isLoading && Object.keys(getOptions).length === 0 && !disabled) {
            getOptions();
        }
    }, [getOptions, isLoading, disabled]);

    return { options, isLoading, error, setOptions };
};

export default useOptions;

type ServiceFunction = () => any;

export type OptionsState = {
    [key: string]: any;
};
