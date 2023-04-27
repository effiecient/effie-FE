type NewFolderIconProps = {
    className?: string;
}

export default function NewFolderIcon({ className } : NewFolderIconProps) {
    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g>
        <path d="M20.75 7H11.96L10.67 4.41C10.54 4.16 10.28 4 10 4H3.25C2.84 4 2.5 4.34 2.5 4.75V18.25C2.5 19.21 3.29 20 4.25 20H20.75C21.71 20 22.5 19.21 22.5 18.25V8.75C22.5 7.79 21.71 7 20.75 7ZM21 18.25C21 18.39 20.89 18.5 20.75 18.5H4.25C4.11 18.5 4 18.39 4 18.25V5.5H9.54L10.83 8.09C10.96 8.34 11.22 8.5 11.5 8.5H20.75C20.89 8.5 21 8.61 21 8.75V18.25Z" className="fill-primary-400" fill="#8474CC"/>
        <path d="M19.5 13.5C19.5 13.91 19.16 14.25 18.75 14.25H16.75V16.25C16.75 16.66 16.41 17 16 17C15.59 17 15.25 16.66 15.25 16.25V14.25H13.25C12.84 14.25 12.5 13.91 12.5 13.5C12.5 13.09 12.84 12.75 13.25 12.75H15.25V10.75C15.25 10.34 15.59 10 16 10C16.41 10 16.75 10.34 16.75 10.75V12.75H18.75C19.16 12.75 19.5 13.09 19.5 13.5Z" className="fill-primary-400" fill="#8474CC"/>
        </g>
        <defs>
        </defs>
        </svg>
    );
}
