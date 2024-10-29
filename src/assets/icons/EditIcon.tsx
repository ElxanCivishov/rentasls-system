import { SVGProps } from "react";

export default function EditIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <div className='edit-icon'>
            <svg width={defaultWidth} height={defaultHeight} viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
                <path
                    d='M11 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5H15C20 22.5 22 20.5 22 15.5V13.5'
                    stroke='#3C7167'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M16.0399 3.51928L8.15988 11.3993C7.85988 11.6993 7.55988 12.2893 7.49988 12.7193L7.06988 15.7293C6.90988 16.8193 7.67988 17.5793 8.76988 17.4293L11.7799 16.9993C12.1999 16.9393 12.7899 16.6393 13.0999 16.3393L20.9799 8.45928C22.3399 7.09928 22.9799 5.51928 20.9799 3.51928C18.9799 1.51928 17.3999 2.15928 16.0399 3.51928Z'
                    stroke='#3C7167'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M14.9102 4.65039C15.5802 7.04039 17.4502 8.91039 19.8502 9.59039'
                    stroke='#3C7167'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );
}

const defaultWidth = 24;
const defaultHeight = 24;
