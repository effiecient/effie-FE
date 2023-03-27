import { useEffect, useState, useRef, useMemo } from "react";

// in milliseconds
const FETCH_TIMEOUT = 10000;

// prop type
type Props = {
    url: string;
    method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    auth?: string;
    body?: any;
};

const useFetchEffieBE = ({ auth, url = "", method = "GET", body }: Props) => {
    const isMounted = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [response, setResponse] = useState<any>();

    useEffect(() => {
        isMounted.current = true;
        setIsLoading(true);
        setIsError(false);
        setResponse(undefined);

        const controller = new AbortController();
        const signal = controller.signal;

        if (url === "") {
            setIsError(true);
            setIsLoading(false);
            return;
        }

        const headers: any = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (auth) {
            headers["Authorization"] = auth;
        }

        const options = {
            method,
            headers,
            signal,
            body: method === "POST" || method === "PUT" || method === "PATCH" ? JSON.stringify(body) : undefined,
        };

        const timeout = setTimeout(() => {
            controller.abort();
        }, FETCH_TIMEOUT);

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted.current) {
                    setResponse(data);
                    setIsError(false);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted.current) {
                    setResponse(err);
                    setIsError(true);
                    setIsLoading(false);
                }
            })
            .finally(() => {
                clearTimeout(timeout);
            });

        return () => {
            isMounted.current = false;
            controller.abort();
            clearTimeout(timeout);
        };
    }, [url, method, auth, body]);

    return {
        isLoading: url === "" ? isLoading : response ? false : true,
        isError,
        response,
    };
};

export default useFetchEffieBE;
