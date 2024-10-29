export function svgToNestedKeyValue(svgString: string): SvgObject {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const svgData: SvgObject = {
        type: svgElement.tagName,
        elements: [] as SvgElement[],
    };

    Array.from(svgElement.attributes).forEach((attr) => {
        svgData[attr.name] = attr.value;
    });

    const styleElement = svgElement.querySelector("style");
    if (styleElement) {
        svgData.style = {
            type: "text/css",
            styles: extractStyles(styleElement.innerHTML),
        };
    }

    function extractElements(element: Element, index: number): SvgElement {
        const svgElement: SvgElement = {
            type: element.tagName.toLowerCase(),
            uuid: `uuid${index + 1}`,
        };

        Array.from(element.attributes).forEach((attr) => {
            svgElement[attr.name] = attr.value;
        });

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
    class?: string;
    [key: string]: any;
}

interface SvgObject {
    [key: string]: any;
}
