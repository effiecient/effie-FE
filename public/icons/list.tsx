type ListIconProps = {
    className?: string;
}

export default function ListIcon({ className } : ListIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_364_2025)">
        <path d="M21.25 8.25H12.75C12.34 8.25 12 7.91 12 7.5C12 7.09 12.34 6.75 12.75 6.75H21.25C21.66 6.75 22 7.09 22 7.5C22 7.91 21.66 8.25 21.25 8.25Z" className="fill-neutral-800" fill="#434D5A"/>
        <path d="M21.25 17.25H12.75C12.34 17.25 12 16.91 12 16.5C12 16.09 12.34 15.75 12.75 15.75H21.25C21.66 15.75 22 16.09 22 16.5C22 16.91 21.66 17.25 21.25 17.25Z" className="fill-neutral-800" fill="#434D5A"/>
        <path d="M8.25 11H2.75C2.34 11 2 10.66 2 10.25V4.75C2 4.34 2.34 4 2.75 4H8.25C8.66 4 9 4.34 9 4.75V10.25C9 10.66 8.66 11 8.25 11ZM3.5 9.5H7.5V5.5H3.5V9.5Z" className="fill-neutral-800" fill="#434D5A"/>
        <path d="M8.25 20H2.75C2.34 20 2 19.66 2 19.25V13.75C2 13.34 2.34 13 2.75 13H8.25C8.66 13 9 13.34 9 13.75V19.25C9 19.66 8.66 20 8.25 20ZM3.5 18.5H7.5V14.5H3.5V18.5Z" className="fill-neutral-800" fill="#434D5A"/>
        </g>
        <defs>
        <clipPath id="clip0_364_2025">
        <rect width="24" height="24" className="fill-white" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}
