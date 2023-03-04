import { useEffect, useState, useRef } from "react";

// in milliseconds
const FETCT_TIMEOUT = 5000;

const useFetchEffieBE = (url: string, method: string, body: any = {}) => {
    // return { isLoading, isError, respond }
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [respond, setRespond] = useState<any>();

    const bodyRef = useRef(body);

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
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(bodyRef.current),
                    signal,
                };
            }

            fetch(url, options)
                .then((res) => res.json())
                .then((res) => {
                    setRespond(res);
                    setIsLoading(false);
                    // clear timeout
                    clearTimeout(timeout);
                })
                .catch((err) => {
                    setIsError(true);
                    setIsLoading(false);
                    setRespond(err);
                    // clear timeout
                });
        }
    }, [url, method, bodyRef]);

    return { isLoading, isError, respond };
};

export default useFetchEffieBE;
