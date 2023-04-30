type DirectoriesIconProps = {
    className?: string;
}

export default function DirectoriesIcon({ className } : DirectoriesIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_165_173)">
        <path d="M30.375 30H5.625C4.185 30 3 28.815 3 27.375V7.125C3 6.51 3.51 6 4.125 6H14.25C14.67 6 15.06 6.24 15.255 6.615L17.19 10.5H30.375C31.815 10.5 33 11.685 33 13.125V27.375C33 28.815 31.815 30 30.375 30ZM5.25 8.25V27.375C5.25 27.585 5.415 27.75 5.625 27.75H30.375C30.585 27.75 30.75 27.585 30.75 27.375V13.125C30.75 12.915 30.585 12.75 30.375 12.75H16.5C16.08 12.75 15.69 12.51 15.495 12.135L13.56 8.25H5.25Z" className="fill-white" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_165_173">
        <rect width="36" height="36" className="fill-white" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}
