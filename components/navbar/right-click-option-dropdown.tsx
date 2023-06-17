import Link from "next/link";
import Image from "next/image";
import { useBrowserStore, useUserStore } from "@/hooks";
import React, { useEffect, useRef } from "react";
import ThemeIcon from "@/public/icons/theme";
import { FE_DOMAIN, FE_TOP_LEVEL_DOMAIN } from "@/config";
import { saveToCookie } from "@/helper";

type RightClickOptionDropdownProps = {
    userImg: string;
    setIsModalOpen: (value: boolean) => void;
    profileRef: React.RefObject<HTMLImageElement>;
};

export default function RightClickOptionDropdown({
    userImg,
    setIsModalOpen,
    profileRef,
}: RightClickOptionDropdownProps) {
    const username = useUserStore((state: any) => state.username);
    const currTheme = useBrowserStore((state: any) => state.theme);
    const setCurrTheme = useUserStore((state: any) => state.setTheme);
    const modalRef = useRef<HTMLDivElement>(null);

    // close modal when click outside
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !profileRef.current?.contains(event.target)
            ) {
                setIsModalOpen(false);
            }
        }

        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [modalRef]);

    const Themes = [
        {
            name: "Effie",
            value: "effie",
            colors: ["#6C5BBA", "#F9B0C3", "#FFC212"],
        },
        {
            name: "Classic Light",
            value: "classic-light",
            colors: ["#8895A7", "#B8C4CE", "#F8F9FA"],
        },
        {
            name: "Classic Dark",
            value: "classic-dark",
            colors: ["#000000", "#434D5A", "#667181"],
        },
    ];

    return (
        <div
            ref={modalRef}
            className="absolute right-0 mt-2 z-10 min-w-fit rounded-lg border border-neutral-100 bg-white"
        >
            {/* PROFILE */}
            <div className="flex gap-3 py-4 px-5 bg-neutral-100 items-center rounded-t-lg relative">
                <div className="relative w-12 h-12 border border-neutral-200 rounded-full">
                    <Image
                        src={userImg}
                        alt="user image"
                        width={48}
                        height={48}
                        className={`rounded-full shadow-inner`}
                    />
                </div>
                <p className="text-neutral-900 font-semibold">{username}</p>
            </div>
            {/* THEME */}
            <div className="px-5 py-3 border-b border-neutral-100">
                {/* TITLE */}
                <div className="flex gap-2 items-center mb-3">
                    <ThemeIcon className="h-6 w-6" />
                    <p className="text-neutral-900">Theme</p>
                </div>
                {/* CONTENT */}
                <div className="flex gap-2 ml-8">
                    {Themes.map((theme, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                type="radio"
                                name="theme"
                                id={theme.value}
                                value={theme.value}
                                hidden
                                onChange={(e) => {
                                    setCurrTheme(e.target.value);
                                    saveToCookie("theme", e.target.value);
                                }}
                            />
                            <label
                                htmlFor={theme.value}
                                aria-label={theme.name}
                            >
                                <div
                                    className={`${
                                        currTheme === theme.value
                                            ? "border-2 border-neutral-800"
                                            : "border-neutral-100"
                                    } border h-9 w-9 bg-neutral-50 cursor-pointer rounded-full`}
                                    style={{
                                        backgroundImage: `linear-gradient(45deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 60%, ${theme.colors[2]} 100%)`,
                                    }}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {/* LOG OUT */}
            <Link
                href="/logout"
                className="flex gap-2 items-center text-danger-300 pt-3 pb-4 px-5 hover:bg-neutral-50 rounded-b-lg duration-200"
            >
                <Image
                    src="/icons/logout.svg"
                    alt="logout icon"
                    width={24}
                    height={24}
                />
                <p>Log out</p>
            </Link>
        </div>
    );
}
