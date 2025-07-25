import React from "react";

interface Props {
    color?: string
}

const SendIcon:React.FC<Props> = ({color="#004282"}) => {
    return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="44" rx="22" fill="#EDF6FF"/>
            <g clip-path="url(#clip0_17152_3709)">
                <path d="M14.0202 13.1387C12.5046 13.1387 11.5281 14.752 12.2351 16.0957L14.821 21.002L23.4968 21.998L14.821 22.998L12.2351 27.9043C11.5281 29.248 12.5007 30.8613 14.0202 30.8613C14.2937 30.8613 14.5671 30.8066 14.821 30.6973L30.8288 23.7832C32.3913 23.1074 32.3913 20.8926 30.8288 20.2168L14.821 13.3027C14.5671 13.1934 14.2937 13.1387 14.0202 13.1387Z" fill={color}/>
            </g>
            <defs>
                <clipPath id="clip0_17152_3709">
                    <rect width="20" height="19.7227" fill="white" transform="translate(12 12.1387)"/>
                </clipPath>
            </defs>
        </svg>
    );
};

export default SendIcon;