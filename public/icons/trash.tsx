type TrashIconProps = {
    className?: string;
    fillClassName?: string;
}

export default function TrashIcon({ className, fillClassName } : TrashIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_379_1154)">
        <path d="M13.74 18.02C13.33 18.02 12.99 17.68 12.99 17.27V12.77C12.99 12.36 13.33 12.02 13.74 12.02C14.15 12.02 14.49 12.36 14.49 12.77V17.27C14.49 17.68 14.16 18.02 13.74 18.02Z" className={fillClassName && fillClassName} fill="#DA3030"/>
        <path d="M10.25 18C9.84 18 9.5 17.66 9.5 17.25V12.75C9.5 12.34 9.84 12 10.25 12C10.66 12 11 12.34 11 12.75V17.25C11 17.66 10.66 18 10.25 18Z" className={fillClassName && fillClassName} fill="#DA3030"/>
        <path d="M20.25 4H12.75V2.75C12.75 2.34 12.41 2 12 2C11.59 2 11.25 2.34 11.25 2.75V4H3.75C3.34 4 3 4.34 3 4.75C3 5.16 3.34 5.5 3.75 5.5H4.32L5.86 19.55C6.01 20.95 7.19 22 8.59 22H15.41C16.81 22 17.99 20.95 18.14 19.55L19.68 5.5H20.25C20.66 5.5 21 5.16 21 4.75C21 4.34 20.66 4 20.25 4ZM16.65 19.39C16.58 20.02 16.05 20.5 15.41 20.5H8.59C7.95 20.5 7.42 20.02 7.35 19.39L6.27 9.5H17.73L16.65 19.39ZM17.89 8H6.11L5.84 5.5H18.16L17.89 8Z" className={fillClassName && fillClassName} fill="#DA3030"/>
        </g>
        <defs>
        <clipPath id="clip0_379_1154">
        <rect width="24" height="24" className={fillClassName ? fillClassName : "fill-white"} fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}
