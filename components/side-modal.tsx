type SideModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
};

export default function SideModal({
    isOpen,
    onClose,
    children,
    className,
}: SideModalProps) {
    return (
        <div
            className={`fixed left-0 w-full h-full top-[75px] ${
                isOpen ? "z-10" : ""
            }`}
        >
            {/* Clickable Background */}
            <div
                className={`absolute ${
                    isOpen
                        ? "w-full h-full bg-black bg-opacity-50 backdrop-blur duration-500"
                        : "opacity-0"
                } `}
                onClick={onClose}
            />
            {/* Side Modal */}
            <div
                className={`${className} fixed right-0 ease-in-out duration-300 w-1/4 h-full bg-white p-6 ${
                    isOpen ? "translate-x-0" : "translate-x-[100%]"
                }`}
            >
                {children}
            </div>
        </div>
    );
}
