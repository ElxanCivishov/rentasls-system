import { SVGProps } from "react";

export default function ArrowIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <div className='arrow-icon'>
            <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 20 20' fill='currentColor' {...props}>
                <g clipPath='url(#clip0_964_5839)'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6.45344 3.53566C6.18295 3.80359 6.1811 4.23796 6.4553 4.50589L10.5098 8.47644L10.5815 8.53761C10.8555 8.74144 11.2472 8.72014 11.496 8.47369C11.6308 8.34018 11.6996 8.16461 11.6996 7.98995C11.6996 7.81438 11.6308 7.63789 11.4942 7.50438L7.43965 3.53292L7.36803 3.47174C7.09397 3.26791 6.70224 3.28922 6.45344 3.53566ZM6.39239 15.5653C6.18316 15.8342 6.20538 16.2197 6.45333 16.4653C6.72475 16.7332 7.16627 16.7341 7.43954 16.4662L13.5446 10.4857L13.6072 10.4156C13.7022 10.2936 13.75 10.1472 13.75 10.0001C13.75 9.82543 13.6812 9.64986 13.5464 9.51635C13.275 9.2475 12.8335 9.24659 12.5602 9.51452L6.45519 15.495L6.39239 15.5653Z'
                        fill='cuurentColor'
                    />
                </g>
                <defs>
                    <clipPath id='clip0_964_5839'>
                        <rect width='20' height='20' fill='currentColor' />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}
