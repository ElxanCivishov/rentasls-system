import { CustomTooltip } from "@/components/CustomTooltip";
import { TRoomDetails } from "@/service/RoomsService";
import { Dispatch, Fragment, SetStateAction, useMemo } from "react";
import { TStyleComponentProps } from "./convertStyle";

function applyElementAttributes(element: CustomSVGElement, active: boolean, setActiveRoom: Dispatch<SetStateAction<string>>, room?: TRoomDetails) {
    const { className, style, ...restProps } = element as any;
    const fill = active && element.type !== "text" ? "#3c7167" : "";
    const empty = room && !room.renter_name && element.type !== "text" ? `${className ?? ""} empty` : "";

    const combinedClassName = active ? `${className ?? ""} active` : className || "";

    return {
        ...restProps,
        className: empty ? "empty" : combinedClassName,
        onClick: () => {
            // eslint-disable-next-line
            console.log("elelemt", element);
            room?.id && setActiveRoom(room.id);
        },
        style: {
            ...style,
            fill,
        },
    };
}

export const RenderGroupedElements = ({ elements, activeRoom, setActiveRoom, rooms = [] }: RenderGroupedElementsProps): JSX.Element[] => {
    return useMemo(
        () =>
            elements.map((element, index) => {
                const room = rooms.find((room) => room.key_for_svg?.split(",").includes(element.uuid));
                const active = activeRoom === room?.id;

                const commonAttributes = applyElementAttributes(element, active, setActiveRoom, room);

                const idx = String(index);

                switch (element.type) {
                    case "polygon":
                        return <polygon key={idx} {...commonAttributes} />;
                    case "polyline":
                        return <polyline key={idx} {...commonAttributes} />;
                    case "line":
                        return <line key={idx} {...element} className={element.className} />;
                    case "rect":
                        return <rect key={idx} {...commonAttributes} />;
                    case "circle":
                        return <circle key={idx} {...commonAttributes} />;
                    case "ellipse":
                        return <ellipse key={idx} {...commonAttributes} />;
                    case "path":
                        return <path key={idx} {...commonAttributes} />;
                    case "text": {
                        const number = room?.number ?? "-";
                        return (
                            <CustomTooltip title={room?.renter_name ?? "Yoxdur"}>
                                <text key={idx} {...commonAttributes}>
                                    {number}
                                </text>
                            </CustomTooltip>
                        );
                    }
                    case "image":
                        return <image key={idx} {...commonAttributes} />;
                    case "g":
                        return (
                            <g key={idx}>
                                <RenderGroupedElements
                                    elements={(element as GroupElement).elements}
                                    setActiveRoom={setActiveRoom}
                                    activeRoom={activeRoom}
                                />
                            </g>
                        );
                    default:
                        return <Fragment key={idx}></Fragment>;
                }
            }),
        [elements, setActiveRoom, rooms, activeRoom],
    );
};

type RenderGroupedElementsProps = {
    elements: CustomSVGElement[];
    setActiveRoom: Dispatch<SetStateAction<string>>;
    activeRoom: string;
    rooms?: TRoomDetails[];
};

export interface TSvgElement {
    type: string;
    elements: CustomSVGElement[];
    style?: TStyleComponentProps;
    [key: string]: any;
}

export type CustomSVGElement = (
    | PolygonElement
    | PolylineElement
    | LineElement
    | RectElement
    | CircleElement
    | EllipseElement
    | PathElement
    | TextElement
    | ImageElement
    | TextCssElement
    | GroupElement
) & {
    uuid: string;
};

interface TextCssElement {
    type: "text/css" | "svg";
}

interface PolygonElement {
    type: "polygon";
    class?: string;
    points: string;
    [key: string]: any;
}

interface PolylineElement {
    type: "polyline";
    class?: string;
    points: string;
    [key: string]: any;
}

interface LineElement {
    type: "line";
    class?: string;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    [key: string]: any;
}

interface RectElement {
    type: "rect";
    class?: string;
    x: string;
    y: string;
    width: string;
    height: string;
    transform?: string;
    [key: string]: any;
}

interface CircleElement {
    type: "circle";
    class?: string;
    cx: string;
    cy: string;
    r: string;
    [key: string]: any;
}

interface EllipseElement {
    type: "ellipse";
    class?: string;
    cx: string;
    cy: string;
    rx: string;
    ry: string;
    [key: string]: any;
}

interface PathElement {
    type: "path";
    class?: string;
    d: string;
    fill?: string;
    [key: string]: any;
}

interface TextElement {
    type: "text";
    class?: string;
    x: string;
    y: string;
    content: string;
    [key: string]: any;
}

interface ImageElement {
    type: "image";
    href: string;
    x: string;
    y: string;
    width: string;
    height: string;
    [key: string]: any;
}

export interface GroupElement {
    type: "g";
    elements: CustomSVGElement[];
}
