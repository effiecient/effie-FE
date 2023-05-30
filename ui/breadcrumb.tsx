type BreadcrumbProps = {
    path: string;
    onClick: () => void;
    className?: string;
};

export default function Breadcrumb({
    path,
    onClick,
    className,
}: BreadcrumbProps) {
    return (
        <button className={`${className} group`} onClick={onClick}>
            <span className="text-neutral-500 group-hover:text-neutral-800 text-lg font-normal bg-bottom bg-gradient-to-r from-secondary-500 to-secondary-500 group-hover:bg-[length:100%_0.5rem] bg-[length:100%_0] bg-no-repeat duration-200">
                {path}
            </span>
        </button>
    );
}
