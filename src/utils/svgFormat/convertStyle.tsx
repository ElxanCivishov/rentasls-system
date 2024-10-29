const StyleComponent = ({ style }: { style?: TStyleComponentProps }) => {
    if (!style) return "";

    const { styles, type = "text/css" } = style;

    const cssString = Object.entries(styles)
        .map(([className, style]) => `${className}{${style}}`)
        .join("\n");

    return (
        <defs>
            <style type={type}>{cssString}</style>
        </defs>
    );
};

export default StyleComponent;

export type TStyleComponentProps = { type: string; styles: Record<string, string | undefined> };
