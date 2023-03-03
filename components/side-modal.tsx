import { useEffect, useState } from "react";

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
    const [isHidden, setIsHidden] = useState(false);
    useEffect(() => {
        // with timer
        if (!isOpen) {
            setTimeout(() => {
                setIsHidden(true);
            }, 500);
        } else {
            setIsHidden(false);
        }
    }, [isOpen]);
    return (
        <div
            className={`${
                isOpen ? "top-0 right-0 w-full absolute h-full z-40" : "-z-10"
            }`}
        >
            {/* Clickable Background */}
            {/* <div
                className={`${
                    isOpen
                        ? "w-full h-full absolute bg-black bg-opacity-50 backdrop-blur duration-500"
                        : "opacity-0"
                } `}
                onClick={onClose}
            /> */}
            <div
                // className={`${
                //     isOpen ? "z-[100]" : "-z-10"
                // } fixed w-full duration-500`}
                className={` ease-in-out duration-300 w-1/3 fixed ${
                    isOpen ? "translate-x-0" : "translate-x-[100%]"
                }`}
            >
                {/* Side Modal */}
                <div
                // className={`${className} ${
                //     isOpen
                //         ? ""
                //         : "motion-safe:translate-x-[100%] opacity-50"
                // } fixed bg-white h-full  right-0 motion-safe:duration-500 ease-in-out p-12`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
