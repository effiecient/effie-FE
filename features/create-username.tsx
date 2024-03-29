import { Button } from "@/ui";
import { useEffect, useState } from "react";
import {
    BE_BASE_URL,
    BE_STATUS_SUCCESS,
    FE_BASE_URL,
    FE_DOMAIN,
    FE_PROTOCOL,
    FE_TOP_LEVEL_DOMAIN,
} from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useRouter } from "next/router";
import Icon from "@/public/images/new-users.gif";
import Image from "next/image";
import { useFetchEffieBE } from "@/hooks";
import LoadingSVG from "@/components/loading-svg";
import { useUserStore } from "@/hooks";
import LoadingAnimation from "@/ui/loading-animation";
import { getKeyFromCookie } from "@/helper";

export function CreateUsername() {
    const router = useRouter();

    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const loggedInUsername = useUserStore((state: any) => state.username);
    const [username, setUsername] = useState<string>("");
    const [isDoneCreateUsername, setIsDoneCreateUsername] =
        useState<boolean>(false);
    const [isInputtingUsername, setIsInputtingUsername] =
        useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleUsernameInput(e: any) {
        setIsInputtingUsername(true);
        e.target.value = e.target.value.replace(/\s/g, "");
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9\-\_]/g, "");
        e.target.value = e.target.value.toLowerCase();
        setUsername(e.target.value);
    }

    const [
        {
            isLoading: isLoadingUsername,
            isError: isErrorUsername,
            response: responseUsername,
        },
        fetcherUsername,
    ] = useFetchEffieBE();

    function handleCreateUsernameOnClick(e: any) {
        // hit register.
        e.preventDefault();
        // username cannot be www, api, undefined, null, admin
        if (
            username === "www" ||
            username === "api" ||
            username === "undefined" ||
            username === "null" ||
            username === "admin"
        ) {
            setIsInputtingUsername(false);
            setErrorMessage("Username is not allowed");
            return;
        }
        const accessToken = getKeyFromCookie("accessToken");
        const uid = getKeyFromCookie("uid");
        // console.log(accessToken, "\n\n\n", uid, "\n\n\n", username);
        if (!accessToken || !uid || !username) {
            console.error("error");
        } else {
            fetcherUsername({
                url: `${BE_BASE_URL}/user/register-google`,
                method: "POST",
                auth: accessToken,
                body: { uid, username },
            });
        }

        // if token is given, save token and username to localStorage
        // else, give error
    }

    // Handle aftermath of creating username
    useEffect(() => {
        if (isLoadingUsername === false && responseUsername) {
            // Data is ready
            if (responseUsername.status === BE_STATUS_SUCCESS) {
                setIsInputtingUsername(true);
                setIsDoneCreateUsername(true);
                const accessToken = getKeyFromCookie("accessToken");
                const uid = getKeyFromCookie("uid");
                const photoURL = getKeyFromCookie("photoURL");
                doEffieLogin(accessToken, uid, photoURL);
            } else {
                setIsInputtingUsername(false);
                console.error(responseUsername);
                setErrorMessage(responseUsername.message);
            }
        }
    }, [isLoadingUsername]);

    // Handle Logging in
    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBE();
    function doEffieLogin(accessToken: any, uid: any, photoURL: any) {
        fetcher({
            url: `${BE_BASE_URL}/user/login-google`,
            method: "POST",
            auth: accessToken,
            body: { uid, photoURL },
        });
    }

    function handleGoBackToHomeOnClick() {
        router.push("/");
    }

    if (isLoggedIn) {
        router.push(
            `${FE_PROTOCOL}://${
                loggedInUsername === "" ? "www" : loggedInUsername
            }.${FE_BASE_URL}`
        );
        return <></>;
    }

    if (isDoneCreateUsername) {
        if (isError) {
            return (
                <div className="h-screen w-screen flex flex-col items-center justify-center">
                    <div className="h-1/6  w-1/6 md:h-1/12 md:w-1/12">
                        <LoadingSVG />
                    </div>
                    <h1>Something went wrong.</h1>
                    <Button onClick={handleGoBackToHomeOnClick}>
                        Go back to home page
                    </Button>
                </div>
            );
        }
        if (isLoading) {
            return (
                <div className="h-screen w-screen flex flex-col items-center justify-center">
                    <div className="h-1/6  w-1/6 md:h-1/12 md:w-1/12">
                        <LoadingSVG />
                    </div>
                    <h1>Logging in...</h1>
                </div>
            );
        }

        // set to cookie to be used accross subdomains. expire in 1 year
        document.cookie = `${EFFIE_AUTH_TOKEN}=${
            response.data.token
        }; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
            new Date().getTime() + 365 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;

        router.push(`${FE_PROTOCOL}://${username}.${FE_BASE_URL}`);
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                <div className="h-1/6  w-1/6 md:h-1/12 md:w-1/12">
                    <LoadingSVG />
                </div>
                <h1>Redirecting to homepage</h1>
            </div>
        );
    } else {
        return (
            <div className="flex w-full h-full justify-center items-center bg-primary-50 px-6 md:px-24">
                {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}> */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start h-fit w-full lg:w-[52rem] gap-8">
                    <div>
                        <Image
                            src={Icon}
                            alt="create username icon"
                            height={240}
                            width={240}
                            className="object-contain"
                        />
                    </div>
                    <div className="w-full">
                        <h1 className="text-2xl md:text-3xl text-neutral-900">
                            Create your username.
                        </h1>
                        <div className="flex flex-col my-6 gap-1 text-neutral-700">
                            <p className="text-neutra-900">
                                Here&apos;s the cool part! Your Effie username
                                will be used in your personal shareable link.
                            </p>
                            <p className="text-danger-200">
                                This username is permanent and cannot be changed
                                once created.
                            </p>
                        </div>
                        <form
                            onSubmit={handleCreateUsernameOnClick}
                            className="flex flex-col md:flex-row gap-4"
                        >
                            <input
                                className="input flex flex-grow !bg-white"
                                required
                                type="text"
                                id="usernameInput"
                                name="usernameInput"
                                onChange={handleUsernameInput}
                                placeholder="username"
                                autoFocus
                            />
                            <Button
                                onClick={handleCreateUsernameOnClick}
                                className="w-full h-8 md:h-12 md:w-36 p-3 flex items-center justify-center disabled:bg-neutral-500"
                                disabled={isLoadingUsername || username === ""}
                            >
                                {isLoadingUsername ? (
                                    <LoadingAnimation />
                                ) : (
                                    "Create Username"
                                )}
                            </Button>
                        </form>
                        <div className="h-4 flex mt-2">
                            {errorMessage !== "" && !isInputtingUsername && (
                                <p className="text-danger-300">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                        <p className="text-neutral-500 mt-4">
                            Your shareable Effie link: https://
                            <span className="text-primary-500 font-bold">
                                {username !== "" ? username : "username"}
                            </span>
                            .effie.boo/path/to/file
                        </p>
                    </div>
                </div>
                {/* </Modal> */}
            </div>
        );
    }
}
