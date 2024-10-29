export default function PlusIcon({ height = "16", width = "16" }: { height?: string; width?: string }) {
    return (
        <svg width={height} height={width} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M2.5 8H13.5' stroke='#3C7167' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M8 2.5V13.5' stroke='#3C7167' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
