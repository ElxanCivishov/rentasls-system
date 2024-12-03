import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import DeleteSmallIcon from "@/assets/icons/DeleteSmallIcon";
import DotsTreeIcon from "@/assets/icons/DotsTreeIcon";
import DownloadSmallIcon from "@/assets/icons/DownloadSmallIcon";
import { TFileDTO } from "@/service/FileService";
import { handleDownloadAndViewFile } from "./const";

type FileActionMenuProps = { upload: TFileDTO; onDeleteHandler?: () => void };

function FileActionMenu({ upload, onDeleteHandler }: Readonly<FileActionMenuProps>) {
    const items: MenuProps["items"] = [
        {
            key: "2",
            label: (
                <button className='action-menu-item' onClick={() => handleDownloadAndViewFile({ upload, action: "download" })}>
                    <DownloadSmallIcon /> <span>Yüklə</span>
                </button>
            ),
        },
        {
            key: "3",
            label: (
                <button className='action-menu-item' onClick={onDeleteHandler}>
                    <DeleteSmallIcon /> <span>Sil</span>
                </button>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]} placement='bottomRight'>
            <button className='align-center' type='button'>
                <DotsTreeIcon />
            </button>
        </Dropdown>
    );
}

export default FileActionMenu;
