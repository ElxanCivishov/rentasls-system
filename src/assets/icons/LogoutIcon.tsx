export default function LogoutIcon({ selected }: { selected?: boolean }) {
    const activeColor = selected ? "#3c7167" : "#fff";
    return (
        <svg width='18' height='18' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.5129 6.1579V5.3804C12.5129 3.68457 11.1379 2.30957 9.44207 2.30957H5.37957C3.68457 2.30957 2.30957 3.68457 2.30957 5.3804V14.6554C2.30957 16.3512 3.68457 17.7262 5.37957 17.7262H9.4504C11.1412 17.7262 12.5129 16.3554 12.5129 14.6646V13.8787'
                stroke={activeColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path d='M18.1738 10.0177H8.13965' stroke={activeColor} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path
                d='M15.7344 7.58838L18.1744 10.0175L15.7344 12.4475'
                stroke={activeColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
