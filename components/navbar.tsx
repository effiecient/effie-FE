import { useState } from "react";
import Login from "./auth/login";
import Register from "./auth/register";
import Button from "./button";
import Image from "next/image";
import loginIcon from "../public/icons/login.svg";
import registerIcon from "../public/icons/register.svg";
import directoriesIcon from "../public/icons/directories.svg";
import newLinkIcon from "../public/icons/new_link.svg";
import userImg from "../public/images/user.png";
import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";

type NavbarProps = {
    isOnLanding: boolean;
};

export default function Navbar({ isOnLanding = false }: NavbarProps) {
    const isRegisterOpen = useRegister((state) => state.isRegisterOpen);
    const setIsRegisterOpen = useRegister((state) => state.setIsRegisterOpen);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            {/* Navbar */}
            <div className="flex flex-row justify-between w-full bg-white h-[75px] items-center px-5">
                <Link href={"/"}>
                    <h1>Effie</h1>
                </Link>
                <div className="space-x-1.5">
                    {isLoggedIn ? (
                        <div className="flex flex-row items-center gap-1.5">
                            {isOnLanding ? (
                                <>
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
                                    <Image
                                        src={userImg}
                                        alt="user image"
                                        width={40}
                                        height={40}
                                    />
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
                                    <Image
                                        src={userImg}
                                        alt="user image"
                                        width={40}
                                        height={40}
                                    />
                                </>
                            )}
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
