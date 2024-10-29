export default function EnumToOptions(
    enumObject: Record<string | number, string | number>,
): { value: string | number; label: string | number; key: string }[] {
    return Object.entries(enumObject).map(([value, label]) => ({ value, key: value, label }));
}
