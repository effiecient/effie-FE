type ChevronRightIconProps = {
    className?: string;
};
export default function ChevronRightIcon({ className }: ChevronRightIconProps) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className}`}
        >
            <path
                d="M6.77756 11.8113C6.5238 12.0639 6.11287 12.0627 5.86036 11.8089C5.60771 11.555 5.60896 11.1442 5.86271 10.8916L8.76163 8L5.86271 5.10843C5.60896 4.85577 5.60771 4.44498 5.86036 4.19108C6.11287 3.93733 6.5238 3.93608 6.77756 4.18873L10.1398 7.54265C10.3924 7.79641 10.3912 8.20734 10.1374 8.45985L6.77756 11.8113Z"
                fill="currentColor"
            />
        </svg>
    );
}
