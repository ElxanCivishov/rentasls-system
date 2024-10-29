export default function EyeIcon({ height = "16", width = "16" }: { height?: string; width?: string }) {
    return (
        <svg width={width} height={height} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M8 3.50098C3 3.50098 1 8.00098 1 8.00098C1 8.00098 3 12.501 8 12.501C13 12.501 15 8.00098 15 8.00098C15 8.00098 13 3.50098 8 3.50098Z'
                stroke='black'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8 10.501C9.38071 10.501 10.5 9.38169 10.5 8.00098C10.5 6.62026 9.38071 5.50098 8 5.50098C6.61929 5.50098 5.5 6.62026 5.5 8.00098C5.5 9.38169 6.61929 10.501 8 10.501Z'
                stroke='black'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
