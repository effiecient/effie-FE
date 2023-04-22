import { Button } from "@/ui";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/hooks";
import { useEffect, useRef } from "react";

type RightClickOptionDropdownProps = {
    userImg: string;
    setIsModalOpen: (value: boolean) => void;
};

export default function RightClickOptionDropdown({userImg, setIsModalOpen} : RightClickOptionDropdownProps) {
    const username = useUserStore((state: any) => state.username);
    const modalRef = useRef<HTMLDivElement>(null);

    // close modal when click outside
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    const Themes = [
        {
            name: "Light",
            value: "light"
        },
        {
            name: "Dark",
            value: "dark"
        },
        {
            name: "System",
            value: "system"
        }
    ]
        
    return (
        <div ref={modalRef} className="absolute right-0 mt-2 z-10 min-w-fit rounded-lg border border-neutral-100 bg-white">
            {/* PROFILE */}
            <div className="flex gap-3 py-4 px-5 bg-neutral-100 items-center rounded-t-lg relative">
                <div className="relative w-12 h-12">
                    <Image
                        src={userImg}
                        alt="user image"
                        width={48}
                        height={48}
                        className={`rounded-full`}
                    />
                </div>
                <p className="text-neutral-900 font-semibold">{username}</p>
            </div>
            {/* THEME */}
            <div className="px-5 py-3 border-b border-neutral-100">
                {/* TITLE */}
                <div className="flex gap-2 items-center mb-3">
                    <Image
                        src="/icons/theme.svg"
                        alt="theme icon"
                        width={24}
                        height={24}
                    />
                    <p className="py-">Theme</p>
                </div>
                {/* CONTENT */}
                <div className="flex gap-2 ml-8">
                    {Themes.map((theme, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input type="radio" name="theme" id={theme.value} value={theme.value} />
                            <label htmlFor={theme.value}>{theme.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            {/* LOG OUT */}
            <Link href="/logout" className="flex gap-2 items-center text-danger-300 pt-3 pb-4 px-5 hover:bg-neutral-50 rounded-b-lg duration-200">
                <Image
                    src="/icons/logout.svg"
                    alt="logout icon"
                    width={24}
                    height={24}
                />
                <p>
                    Log out
                </p>
            </Link>
        </div>
    );
}