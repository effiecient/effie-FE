import { useState, useEffect } from 'react';

type DropdownProps = {
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
};

export default function Dropdown({ options, selectedOption, setSelectedOption }: DropdownProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    // If click outside of dropdown, close dropdown
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (event.target.closest(".relative") === null) {
                setIsOptionsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="relative inline-block text-left">
            <button
                className="flex items-center justify-between w-32 px-4 py-1 text-sm font-medium text-neutral-800 border-2 border-neutral-100 rounded-full hover:bg-neutral-100/50 duration-100"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
                {selectedOption}
                <img src="/icons/chevron-down.svg" alt="chevron-down" className="ml-3 h-3" />
            </button>
            
            { isOptionsOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-32 rounded-lg bg-white border border-neutral-200 text-neutral-800"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {options.map((option) => (
                            <button
                                key={option}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-50 hover:text-gray-900 w-full text-left font-normal"
                                role="menuitem"
                                onClick={() => setSelectedOption(option.replace(/ /g, "-").toLowerCase())}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}