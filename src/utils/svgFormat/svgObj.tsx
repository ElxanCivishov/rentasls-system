export function svgToNestedKeyValue(svgString: string): SvgObject {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const svgData: SvgObject = {
        type: svgElement.tagName,
        attributes: extractAttributes(svgElement),
        elements: [] as SvgElement[],
    };

    const styleElement = svgElement.querySelector("style");
    if (styleElement) {
        svgData.style = {
            type: "text/css",
            styles: extractStyles(styleElement.innerHTML),
        };
    }

    const positionMap: Map<string, SvgElement> = new Map(); // Map for storing element positions for overlap detection

    function getPositionKey(element: Element): string {
        const x = element.getAttribute("x");
        const y = element.getAttribute("y");
        const d = element.getAttribute("d"); // For paths
        const points = element.getAttribute("points"); // For polygons

        if (x && y) {
            return `x:${x}-y:${y}`;
        } else if (d) {
            return `path:${d}`;
        } else if (points) {
            return `polygon:${points}`;
        }
        return ""; // Return empty if no positional attribute is found
    }

    function extractElements(element: Element, index: number): SvgElement {
        const positionKey = getPositionKey(element);


        let uuid = `uuid${index + 1}`;

        if (element.tagName.toLowerCase() === "text" && positionKey) {
            if (positionMap.has(positionKey)) {
                const overlappingElement = positionMap.get(positionKey);
                uuid = overlappingElement!.uuid;
            }
        }
        const svgElement: SvgElement = {
            type: element.tagName.toLowerCase(),
            uuid,
            attributes: extractAttributes(element),
        };

        // If it's a text element, check for overlap with other elements

        // For non-text elements, add their position to the positionMap for overlap detection
        if (positionKey && svgElement.type !== "text") {
            positionMap.set(positionKey, svgElement);
        }

        if (element.children.length > 0) {
            svgElement.elements = Array.from(element.children).map((child, indx) => extractElements(child, indx));
        }

        return svgElement;
    }

    Array.from(svgElement.children).forEach((child, index) => {
        svgData.elements.push(extractElements(child, index));
    });

    return svgData;
}

function extractAttributes(element: Element): Record<string, string> {
    const attributes: Record<string, string> = {};
    Array.from(element.attributes).forEach((attr) => {
        attributes[attr.name] = attr.value;
    });
    return attributes;
}

function extractStyles(styleString: string): Record<string, string> {
    const styles: Record<string, string> = {};
    const regex = /\.([\w-]+)\s*{([^}]*)}/g;
    let match;

    while ((match = regex.exec(styleString)) !== null) {
        styles[`.${match[1]}`] = match[2].trim();
    }

    return styles;
}

interface SvgElement {
    type: string;
    uuid: string;
    attributes: Record<string, string>;
    elements?: SvgElement[];
    [key: string]: any;
}

interface SvgObject {
    type: string;
    attributes: Record<string, string>;
    elements: SvgElement[];
    style?: {
        type: string;
        styles: Record<string, string>;
    };
    [key: string]: any;
}
