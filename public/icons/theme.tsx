type ThemeIconProps = {
    className?: string;
}

export default function ThemeIcon({ className } : ThemeIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_462_970)">
        <path d="M19.83 12.38C19.58 11.12 19 9.92001 18.16 8.91001L12.57 2.27001C12.29 1.93001 11.71 1.93001 11.43 2.27001L5.83 8.91001C5 9.92001 4.42 11.12 4.18 12.35C4.06 12.88 4 13.42 4 14C4 14.25 4.01 14.5 4.04 14.75V14.83C4.46 18.92 7.88 22 12 22C16.12 22 19.54 18.92 19.96 14.83V14.75C19.99 14.5 20 14.25 20 14C20 13.42 19.94 12.88 19.83 12.38ZM5.65 12.66C5.84 11.65 6.31 10.69 6.98 9.87001L12 3.91001L17.01 9.87001C17.69 10.69 18.16 11.65 18.36 12.69C18.45 13.1 18.5 13.53 18.5 14H5.5C5.5 13.53 5.55 13.1 5.65 12.66Z" className="fill-neutral-800" fill="#434D5A"/>
        </g>
        <defs>
        <clipPath id="clip0_462_970">
        <rect width="24" height="24" className="fill-white" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}
