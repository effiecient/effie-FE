type rightContextProps = {
    isOpen: boolean;
    onClose: () => void;
    options: {
        title: string;
        onClick: () => void;
    };
    x: number;
    y: number;
    closeOnOutsideClick?: boolean;
    closeOnOptionClick?: boolean;
};
const RightContext = ({
    isOpen,
    onClose,
    options,
    x,
    y,
    closeOnOutsideClick = true,
    closeOnOptionClick = true,
}: rightContextProps) => {
    return (
        <>
            {/* background */}
            <div
                className={`${
                    isOpen &&
                    "fixed top-0 left-0 right-0 bottom-0 z-50 bg-neutral-400"
                }`}
                onClick={() => closeOnOutsideClick && onClose()}
            >
                {/* menu */}
                <div
                    className={`${isOpen && "fixed z-50 bg-white"}`}
                    style={{ top: `${y}px`, left: `${x}px` }}
                >
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold mt-4 mb-2">
                            {options.title}
                        </h1>

                        <button
                            className="bg-primary-500 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                options.onClick();
                                closeOnOptionClick && onClose();
                            }}
                        >
                            {options.title}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightContext;
