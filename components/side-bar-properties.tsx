type SideBarPropertiesProps = {
    isOpen: boolean;
    onClose: () => void;
    linkData: {
        title: string;
        url: string;
    };
    className?: string;
    link?: string;
};

export default function SideBarProperties({
    isOpen = false,
    onClose,
    linkData,
    className,
}: SideBarPropertiesProps) {
    return (
        <div>
            <div
                className={`${className} fixed right-0 ease-in-out duration-300 w-1/4 h-full bg-white p-6 ${
                    isOpen ? "translate-x-0" : "translate-x-[100%]"
                }`}
            >
                {linkData.title}
                {linkData.url}
            </div>
        </div>
    );
}
