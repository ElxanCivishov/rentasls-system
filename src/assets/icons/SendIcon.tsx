export default function SendIcon({ height = "17", width = "20" }: { height?: string; width?: string }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 20 17' fill='none'>
            <path
                d='M18.942 7.00197L13.0002 1.66551C12.5629 1.27275 11.8669 1.58314 11.8669 2.17096V4.49024C3.27835 4.95027 1.29585 11.8787 0.83851 15.052C0.780539 15.4541 1.29417 15.6658 1.53897 15.3416C3.70368 12.4761 7.10538 10.7548 10.7546 10.7548H11.8669V12.8438C11.8669 13.4316 12.5629 13.742 13.0002 13.3493L18.942 8.01281C19.2424 7.74287 19.2424 7.27192 18.942 7.00197Z'
                stroke='black'
                strokeWidth='1.12323'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
