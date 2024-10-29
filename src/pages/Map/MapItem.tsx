import { ContentLoading } from "@/components/CustomLoading";
import CustomSwiper from "@/components/CustomSwiper";
import { RoomsService } from "@/service/RoomsService";
import StyleComponent from "@/utils/svgFormat/convertStyle";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { RenderGroupedElements, TSvgElement } from "../../utils/svgFormat/svgFormat";
import RoomInfo from "./RoomInfo";

const MapItem: React.FC<{ svgData: TSvgElement; activeFloor: string | null }> = ({ svgData, activeFloor }) => {
    const [activeRoom, setActiveRoom] = useState<string>("");
    const { company } = useParams<{ company: string }>();

    const { data: rooms = { data: [] } } = useQuery({
        queryKey: ["rooms", activeFloor],
        queryFn: async () => {
            const response = activeFloor ? await RoomsService.getAll({ companyId: company!, floor_id: activeFloor }) : null;
            return response;
        },
        enabled: !!activeFloor,
    });

    const { data: roomDetails, isLoading } = useQuery({
        queryKey: ["room-details", activeRoom, company],
        queryFn: async () => {
            const response = activeRoom ? await RoomsService.getById({ roomId: activeRoom, companyId: company! }) : null;
            return response;
        },
        enabled: !!activeRoom,
    });

    const { elements, style, ...rest } = svgData;

    const roomsData = rooms?.data.map((room, index) => ({ ...room, uuid: `uuid${index + 10}` }));

    return (
        <>
            <div className='map-details-wrapper'>
                <div className='svg'>
                    {/* <div className='w-full'> */}
                    <svg className='w-full pointer' {...rest}>
                        <StyleComponent style={style} />
                        <RenderGroupedElements elements={elements} setActiveRoom={setActiveRoom} activeRoom={activeRoom} rooms={roomsData} />
                    </svg>
                    {/* </div> */}
                </div>
                <div className='details'>{isLoading ? <ContentLoading /> : roomDetails && <RoomInfo {...roomDetails?.data} />}</div>
            </div>

            <div className='w-full'>
                <CustomSwiper files={roomDetails?.data?.files} />
            </div>
        </>
    );
};

export default MapItem;
