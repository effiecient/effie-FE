import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useEffect, useState, useRef } from "react";

// in milliseconds
const FETCT_TIMEOUT = 10000;

const useFetchEffieBE = (
    url: string,
    method: string = "GET",
    auth: any = undefined,
    body: any = {}
) => {
    // return { isLoading, isError, respond }
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [respond, setRespond] = useState<any>();

    const bodyRef = useRef(body);
    if (auth === undefined) {
        if (typeof localStorage !== "undefined") {
            auth = localStorage.getItem(EFFIE_AUTH_TOKEN);
        }
    }

    useEffect(() => {
        if (url) {
            // fetch with timeout
            const controller = new AbortController();
            const signal = controller.signal;
            const timeout = setTimeout(() => controller.abort(), FETCT_TIMEOUT);
            let options: any;
            if (method === "GET") {
                options = {
                    signal,
                };
            } else if (method === "POST") {
                options = {
                    method: method,
                    headers: {
                        Authorization: auth,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(bodyRef.current),
                    signal,
                };
            }
            if (auth) {
                // add Authorization key
                if (!options.headers) {
                    options.headers = {};
                }
                options.headers["Authorization"] = auth;
            }

            fetch(url, options)
                .then((res) => res.json())
                .then((res) => {
                    setRespond(res);
                    setIsError(false);
                    setIsLoading(false);
                    // clear timeout
                    clearTimeout(timeout);
                })
                .catch((err) => {
                    setRespond(err);
                    setIsError(true);
                    setIsLoading(false);
                    // clear timeout
                });
        } else {
            setIsError(true);
            setIsLoading(false);
        }
    }, [url, method, auth, bodyRef]);
    return { isLoading, isError, respond };
};

export default useFetchEffieBE;
