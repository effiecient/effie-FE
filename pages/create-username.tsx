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
import Icon from "@/public/icons/create-username.svg";
import Image from "next/image";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";
import LoadingSVG from "@/components/loading-svg";
import { useUserStore } from "@/hooks";
export default function CreateUsername() {
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
        setUsername(e.target.value);
    }

    const [
        {
            isLoading: isLoadingUsername,
            isError: isErrorUsername,
            response: responseUsername,
            fetchStarted: fetchStartedUsername,
        },
        fetcherUsername,
    ] = useFetchEffieBENew();

    function handleCreateUsernameOnClick(e: any) {
        // hit register.
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const uid = localStorage.getItem("uid");
        console.log(accessToken, "\n\n\n", uid, "\n\n\n", username);
        if (!accessToken || !uid || !username) {
            console.error("error");
        } else {
            fetcherUsername({
                url: `${BE_BASE_URL}/user/register`,
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
        if (fetchStartedUsername === true && isLoadingUsername === false) {
            // Data is ready
            if (responseUsername.status === BE_STATUS_SUCCESS) {
                setIsInputtingUsername(true);
                setIsDoneCreateUsername(true);
                const accessToken = localStorage.getItem("accessToken");
                const uid = localStorage.getItem("uid");
                const photoURL = localStorage.getItem("photoURL");
                doEffieLogin(accessToken, uid, photoURL);
            } else {
                // TODO: change this to snackbar
                setIsInputtingUsername(false);
                console.error(responseUsername);
                setErrorMessage(responseUsername.message);
            }
        }
    }, [isLoadingUsername]);

    // Handle Logging in
    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();
    function doEffieLogin(accessToken: any, uid: any, photoURL: any) {
        fetcher({
            url: `${BE_BASE_URL}/user/login`,
            method: "POST",
            auth: accessToken,
            body: { uid, photoURL },
        });
    }

    function handleGoBackToHomeOnClick() {
        router.push("/");
    }

    if (isLoggedIn) {
        router.push(`${FE_PROTOCOL}://${loggedInUsername}.${FE_BASE_URL}`);
        return;
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
        if (isLoading || !fetchStarted) {
            return (
                <div className="h-screen w-screen flex flex-col items-center justify-center">
                    <div className="h-1/6  w-1/6 md:h-1/12 md:w-1/12">
                        <LoadingSVG />
                    </div>
                    <h1>Logging in...</h1>
                </div>
            );
        }
        // set token to local storage
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(EFFIE_AUTH_TOKEN, response.token);
        }
        // set to cookie to be used accross subdomains. expire in 1 year
        document.cookie = `${EFFIE_AUTH_TOKEN}=${
            response.token
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
            <div className="flex w-full h-full justify-center items-center bg-primary-200">
                {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}> */}
                <div className="flex flex-row h-fit w-fit gap-8">
                    <div>
                        <Image src={Icon} alt="create username icon"></Image>
                    </div>
                    <div>
                        <h1 className="text-neutral-900">
                            Create your username.
                        </h1>
                        <div className="flex flex-col my-6 gap-1">
                            <p className="text-neutra-900">
                                One last step! Your Effie username will be used
                                in your personal shareable link.
                            </p>
                            <p className="text-danger-400">
                                This username is permanent and cannot be changed
                                once created.
                            </p>
                        </div>
                        <form
                            onSubmit={handleCreateUsernameOnClick}
                            className="flex flex-row gap-6"
                        >
                            <input
                                className="input flex flex-grow"
                                required
                                type="text"
                                id="usernameInput"
                                name="usernameInput"
                                onChange={handleUsernameInput}
                                placeholder="Username"
                            />
                            <Button
                                onClick={handleCreateUsernameOnClick}
                                className="p-3 w-2/6 flex items-center justify-center"
                                disabled={isLoadingUsername}
                            >
                                {isLoadingUsername
                                    ? "Loading"
                                    : "Create Username"}
                            </Button>
                        </form>
                        <div className="h-4 flex mt-2">
                            {isErrorUsername && !isInputtingUsername && (
                                <p className="text-danger-400">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                        <p className="text-neutral-500 mt-4">
                            Your shareable Effie link: https://
                            <span className="text-primary-500 font-bold">
                                username
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
