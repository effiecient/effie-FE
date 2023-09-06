type EditIconProps = {
    className?: string;
    fillClassName?: string;
}

export default function EditIcon({ className, fillClassName } : EditIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_36_606)">
        <path d="M21.25 18.47H8.21997L15.07 11.62L17.47 9.22C17.83 8.86 18.03 8.38 18.03 7.87C18.03 7.37 17.83 6.89 17.47 6.53L15.47 4.53C14.75 3.81 13.5 3.81 12.78 4.53L2.19997 15.11C2.05997 15.26 1.96997 15.45 1.96997 15.66V19.25C1.96997 19.68 2.31997 20.03 2.74997 20.03H21.25C21.68 20.03 22.03 19.68 22.03 19.25C22.03 18.82 21.68 18.47 21.25 18.47ZM13.88 5.63C14.05 5.45 14.19 5.45 14.38 5.63L16.37 7.62C16.46 7.71 16.47 7.82 16.47 7.87C16.47 7.93 16.46 8.03 16.37 8.12L14.52 9.97L12.03 7.48L13.88 5.63ZM3.52997 18.47V15.98L10.94 8.58L13.43 11.07L6.01997 18.47H3.52997Z" className={fillClassName ? fillClassName : "fill-primary-400"} fill="#8474CC"/>
        </g>
        <defs>
        <clipPath id="clip0_36_606">
        <rect width="24" height="24" className={fillClassName ? fillClassName : "fill-white"} fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}
