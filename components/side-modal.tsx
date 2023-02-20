type SideModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
};

export default function SideModal({ isOpen, onClose, children, className } : SideModalProps) {
    return (
        <div className={`${isOpen ? "z-[100]" : "-z-10"} fixed w-full`}>
            {/* Clickable Background */}
            <div className="fixed w-full h-full bg-black bg-opacity-50 backdrop-blur" onClick={onClose} />
            
            {/* Modal */}
            <div className={`${className} ${isOpen ? "" : "motion-safe:translate-x-[100%] opacity-50"} fixed bg-white h-full w-1/3 right-0 motion-safe:duration-500 ease-in-out p-12`}>
                {children}
            </div>
        </div>
    );
}