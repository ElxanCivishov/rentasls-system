import { CustomNoOptions } from "@/components/CustomNoOptions";
import { Table, TableProps } from "antd";
import { FC } from "react";

export type CustomTableProps = { columns: Array<any> | undefined; data?: Array<any> } & TableProps<any>;

export const CustomTable: FC<CustomTableProps> = function ({ columns, data = [], ...rest }) {
    return (
        <Table
            rowKey={(record) => record?.id ?? record?.key}
            columns={columns}
            dataSource={data}
            className='w-full'
            size='middle'
            {...rest}
            locale={{ emptyText: CustomNoOptions }}
        />
    );
};
