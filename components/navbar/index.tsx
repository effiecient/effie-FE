import { useRef, useState } from "react";
import Login from "./auth/login";
import Register from "./auth/register";
import { Button } from "@/ui";
import Image from "next/image";
import loginIcon from "@/public/icons/login.svg";
import registerIcon from "@/public/icons/register.svg";
import directoriesIcon from "@/public/icons/directories-white.svg";
import newLinkIcon from "@/public/icons/new_link.svg";
import defaultUserImg from "@/public/images/user.png";
import { useRegister, useUserStore } from "@/hooks";
import Link from "next/link";
// TODO: update this to import from config only
import { FE_BASE_URL, FE_FULL_BASE_URL, FE_PROTOCOL } from "@/config/fe-config";
import RightClickOptionDropdown from "./right-click-option-dropdown";

type NavbarProps = {
    isOnLanding?: boolean;
};

export default function Navbar({ isOnLanding = false }: NavbarProps) {
    const isRegisterOpen = useRegister((state) => state.isRegisterOpen);
    const setIsRegisterOpen = useRegister((state) => state.setIsRegisterOpen);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const username = useUserStore((state: any) => state.username);
    const hasPhotoURL = useUserStore((state: any) => state.hasPhotoURL);
    const photoURL = useUserStore((state: any) => state.photoURL);
    const profileRef = useRef<HTMLImageElement>(null);

    return (
        <>
            {/* Navbar */}
            <div className="relative right-0 left-0 top-0 h-16" />
            <div className="fixed right-0 left-0 top-0 h-16 z-50">
                <nav
                    className={`flex flex-row justify-between w-full bg-white items-center px-6 py-3`}
                >
                    {/* Logo */}
                    <Link href={`${FE_FULL_BASE_URL}`} target="_self">
                        <h1 className="text-2xl">Effie</h1>
                    </Link>
                    {/* Login-Register */}
                    <div className="space-x-2">
                        {/* Navbar for logged-in users */}
                        {isLoggedIn ? (
                            <div className="flex flex-row items-center gap-3">
                                {/* <h6>{username}</h6> */}
                                {isOnLanding ? (
                                    <>
                                        <Link
                                            href={`${FE_PROTOCOL}://${username}.${FE_BASE_URL}`}
                                            target="_self"
                                        >
                                            <Button type="default" pill={true}>
                                                <div className="flex flex-row gap-2 items-center">
                                                    {}
                                                    <Image
                                                        src={directoriesIcon}
                                                        alt="register icon"
                                                        height={20}
                                                        width={20}
                                                    />
                                                    My Directories
                                                </div>
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Button type="default" pill={true}>
                                            <div className="flex flex-row gap-2 items-center">
                                                {}
                                                <Image
                                                    src={newLinkIcon}
                                                    alt="new link icon"
                                                    height={20}
                                                    width={20}
                                                />
                                                New Link
                                            </div>
                                        </Button>
                                    </>
                                )}
                                <div className="relative">
                                    <Image
                                        ref={profileRef}
                                        src={
                                            hasPhotoURL
                                                ? photoURL
                                                : defaultUserImg
                                        }
                                        alt="user image"
                                        width={36}
                                        height={36}
                                        onClick={() => {
                                            setShowLogout(!showLogout);
                                        }}
                                        className={`cursor-pointer rounded-full border border-neutral-200`}
                                    />
                                    {showLogout && (
                                        <RightClickOptionDropdown userImg={hasPhotoURL ? photoURL : defaultUserImg} setIsModalOpen={setShowLogout} profileRef={profileRef} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Navbar for non-logged-in users (landing page)
                            <>
                                {/* Login Button */}
                                <Button
                                    onClick={() => {
                                        setIsLoginOpen(!isLoginOpen);
                                        setIsRegisterOpen(false);
                                    }}
                                    type="custom"
                                    className={`${
                                        isLoginOpen ? "opacity-50" : ""
                                    } text-primary-500 bg-white border-primary-500 border-2 enabled:hover:bg-primary-50`}
                                    pill={true}
                                >
                                    <div className="flex gap-2 items-center">
                                        <Image
                                            src={loginIcon}
                                            alt="login icon"
                                        />
                                        Login
                                    </div>
                                </Button>
                                {/* Register Button */}
                                <Button
                                    onClick={() => {
                                        setIsRegisterOpen(!isRegisterOpen);
                                        setIsLoginOpen(false);
                                    }}
                                    type="default"
                                    className={`${
                                        isRegisterOpen ? "opacity-50" : ""
                                    }`}
                                    pill={true}
                                >
                                    <div className="flex flex-row gap-1.5 items-center">
                                        <Image
                                            src={registerIcon}
                                            alt="register icon"
                                        />
                                        Register
                                    </div>
                                </Button>
                            </>
                        )}
                    </div>
                </nav>
            </div>

            {/* Register */}
            <Register
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />

            {/* Login */}
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}
