type DirectoriesIconProps = {
    className?: string;
}

export default function DirectoriesIcon({ className } : DirectoriesIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_511_281)">
        <path d="M20.25 20H3.75C2.79 20 2 19.21 2 18.25V4.75C2 4.34 2.34 4 2.75 4H9.5C9.78 4 10.04 4.16 10.17 4.41L11.46 7H20.25C21.21 7 22 7.79 22 8.75V18.25C22 19.21 21.21 20 20.25 20ZM3.5 5.5V18.25C3.5 18.39 3.61 18.5 3.75 18.5H20.25C20.39 18.5 20.5 18.39 20.5 18.25V8.75C20.5 8.61 20.39 8.5 20.25 8.5H11C10.72 8.5 10.46 8.34 10.33 8.09L9.04 5.5H3.5Z" className="fill-neutral-800" fill="#434D5A"/>
        </g>
        <defs>
        <clipPath id="clip0_511_281">
        <rect width="24" height="24" className="fill-white" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}