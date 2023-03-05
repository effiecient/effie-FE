import { useState } from "react";
import Login from "./auth/login";
import Register from "./auth/register";
import Button from "./button";
import Image from "next/image";
import loginIcon from "@/public/icons/login.svg";
import registerIcon from "@/public/icons/register.svg";
import directoriesIcon from "@/public/icons/directories-white.svg";
import newLinkIcon from "@/public/icons/new_link.svg";
import userImg from "@/public/images/user.png";
import { useRegister, useUserStore } from "@/hooks";
import Link from "next/link";

type NavbarProps = {
    isOnLanding: boolean;
};

export default function Navbar({ isOnLanding = false }: NavbarProps) {
    const isRegisterOpen = useRegister((state) => state.isRegisterOpen);
    const setIsRegisterOpen = useRegister((state) => state.setIsRegisterOpen);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    // const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const isLoggedIn = true;
    const username = useUserStore((state: any) => state.username);

    return (
        <>
            {/* Navbar */}
            <div className="fixed flex flex-row justify-between w-full bg-white h-[75px] items-center px-5">
                <Link href={"/"}>
                    <h1>Effie</h1>
                </Link>
                <div className="space-x-1.5">
                    {isLoggedIn ? (
                        <div className="flex flex-row items-center gap-1.5">
                            {username}
                            {isOnLanding ? (
                                <>
                                    <Link href={"/browser"}>
                                        <Button type="default" pill={true}>
                                            <div className="flex flex-row gap-1.5 items-center">
                                                {}
                                                <Image
                                                    src={directoriesIcon}
                                                    alt="register icon"
                                                />
                                                My Directories
                                            </div>
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Button type="default" pill={true}>
                                        <div className="flex flex-row gap-1.5 items-center">
                                            {}
                                            <Image
                                                src={newLinkIcon}
                                                alt="new link icon"
                                            />
                                            New Link
                                        </div>
                                    </Button>
                                </>
                            )}
                            <div className="relative">
                                <Image
                                    src={userImg}
                                    alt="user image"
                                    width={40}
                                    height={40}
                                    onClick={() => setShowLogout(!showLogout)}
                                    className={`cursor-pointer`}
                                />
                                {showLogout && (
                                    <div className="absolute right-0 mt-2">
                                        <Link href={"/logout"}>
                                            <Button
                                                type="default"
                                                pill={true}
                                                className={`bg-danger-300 hover:bg-danger-400`}
                                            >
                                                Logout
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    setIsLoginOpen(!isLoginOpen);
                                    setIsRegisterOpen(false);
                                }}
                                type="custom"
                                className={`${
                                    isLoginOpen ? "opacity-50" : ""
                                } text-primary-500 bg-white border-primary-500 border-2`}
                                pill={true}
                            >
                                <div className="flex flex-row gap-1.5 items-center">
                                    <Image src={loginIcon} alt="login icon" />
                                    Login
                                </div>
                            </Button>
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
            </div>

            {/* Register */}
            <Register
                isOpen={isRegisterOpen}
                onClose={() => {
                    setIsRegisterOpen(false);
                }}
            />

            {/* Login */}
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}
