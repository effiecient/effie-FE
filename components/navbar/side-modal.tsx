type SideModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
};

export default function SideModal({
    isOpen = false,
    onClose,
    children,
    className,
}: SideModalProps) {
    return (
        <div
            className={`mt-16 fixed -top-1 bottom-0 right-0 left-0 duration-500 overflow-clip ${
                isOpen ? "z-20" : "-z-10"
            }`}
        >
            {/* Clickable Background */}
            <div
                className={`h-full w-full bg-black/50 backdrop-blur duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />
            {/* Side Modal */}
            <div
                className={`absolute bottom-0 top-0 right-0  bg-white duration-300 w-full md:w-1/2 lg:w-1/4  ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className={`p-6 ${className}`}>{children}</div>
            </div>
        </div>
    );
}
