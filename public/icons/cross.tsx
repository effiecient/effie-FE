type CrossIconProps = {
    className?: string;
}

export default function CrossIcon({ className } : CrossIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
        <g clipPath="url(#clip0_338_949)">
        <path d="M19.0919 17.0993C19.636 17.6432 19.636 18.5435 19.0919 19.0874C18.8105 19.3687 18.454 19.5 18.0976 19.5C17.7411 19.5 17.3846 19.3687 17.1032 19.0874L12 13.9858L6.89681 19.0874C6.61538 19.3687 6.25891 19.5 5.90244 19.5C5.54597 19.5 5.18949 19.3687 4.90807 19.0874C4.36398 18.5435 4.36398 17.6432 4.90807 17.0993L10.0113 11.9977L4.90807 6.89606C4.36398 6.35214 4.36398 5.45186 4.90807 4.90794C5.45216 4.36402 6.35272 4.36402 6.89681 4.90794L12 10.0095L17.1032 4.90794C17.6473 4.36402 18.5478 4.36402 19.0919 4.90794C19.636 5.45186 19.636 6.35214 19.0919 6.89606L13.9887 11.9977L19.0919 17.0993Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_338_949">
        <rect width="24" height="24" className="fill-white" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}
