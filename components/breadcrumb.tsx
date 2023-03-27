
type BreadcrumbProps = {
    path: string;
    onClick: () => void;
};

export default function Breadcrumb({ path, onClick } : BreadcrumbProps) {
    return(
        <button 
            className="group p-4"
            onClick={onClick}
        >
            <p className="text-neutral-400 group-hover:text-neutral-800 font-normal bg-bottom bg-gradient-to-r from-secondary-500 to-secondary-500 group-hover:bg-[length:100%_0.3rem] bg-[length:100%_0] bg-no-repeat duration-200">
                {path}
            </p>
        </button>
    )
}