import { useState } from "react";

type rightContextProps = {
    closeOnOutsideClick?: boolean;
    closeOnOptionClick?: boolean;
};
const RightContext = ({
    closeOnOutsideClick = true,
    closeOnOptionClick = true,
}: rightContextProps) => {
    const x = useRightContextStore((state: any) => state.x);
    const y = useRightContextStore((state: any) => state.y);
    const [isOpen, setIsOpen] = useRightContextStore((state: any) => [
        state.isOpen,
        state.setIsOpen,
    ]);
    const options = useRightContextStore((state: any) => state.options);

    return (
        <>
            {/* background */}
            <div
                className={`${
                    isOpen
                        ? "fixed top-0 left-0 right-0 bottom-0 z-50"
                        : "hidden"
                }`}
                onClick={() => closeOnOutsideClick && setIsOpen(false)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                }}
            ></div>
            {/* menu */}
            <div
                // dropdown animation
                className={`${
                    isOpen
                        ? "fixed z-50 bg-white border-2 border-neutral-100 rounded-lg py-2 transition-all"
                        : "hidden"
                }`}
                style={{ top: `${y}px`, left: `${x}px` }}
            >
                {options.map((option: option, index: number) => (
                    <RightContextOption
                        key={index}
                        title={option.title}
                        onClick={() => {
                            option.onClick();
                            if (closeOnOptionClick) {
                                setIsOpen(false);
                            }
                        }}
                    />
                ))}
            </div>
        </>
    );
};

// use zustand to manage x and y
import { create } from "zustand";
import { shallow } from "zustand/shallow";

// options is an array of objects with title and onClick
type option = {
    title: string;
    onClick: () => void;
};
type options = option[];

const useRightContextStore = create((set) => ({
    isOpen: false,
    x: 0,
    y: 0,
    options: [],
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setX: (x: number) => set({ x }),
    setY: (y: number) => set({ y }),
    setOptions: (options: options) => set({ options }),
}));

export const useRightContext = () => {
    const [setX, setY, setIsOpen, setOptions] = useRightContextStore(
        (state: any) => [
            state.setX,
            state.setY,
            state.setIsOpen,
            state.setOptions,
        ],
        shallow
    );

    const handleRightClick = (e: any) => {
        e.preventDefault();
        setX(e.clientX);
        setY(e.clientY);
        setIsOpen(true);
    };

    return { handleRightClick, setOptions };
};

const RightContextOption = ({ title, onClick }: any) => {
    return (
        <div>
            <button
                className="hover:bg-neutral-200 text-neutral-900 text-md p-3"
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};
export default RightContext;
