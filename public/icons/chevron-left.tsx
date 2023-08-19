type ChevronLeftIconProps = {
    className?: string;
};
export default function ChevronLeftIcon({ className }: ChevronLeftIconProps) {
    return (
        <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className}`}
        >
            <path
                d="M7.28482 0.992346C7.28482 1.24458 7.1919 1.49681 6.99277 1.69594L2.39951 6.30247L7.00604 10.909C7.39103 11.294 7.39103 11.9312 7.00604 12.3162C6.62106 12.7012 5.98384 12.7012 5.59886 12.3162L0.288738 7.00606C-0.0962457 6.62108 -0.0962457 5.98386 0.288738 5.59888L5.59886 0.288756C5.98384 -0.0962283 6.62106 -0.0962283 7.00604 0.288756C7.1919 0.487885 7.28482 0.740115 7.28482 0.992346Z"
                fill="currentColor"
            />
        </svg>
    );
}
