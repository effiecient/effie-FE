import { useCallback, useMemo, useReducer, useState } from "react";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { BE_STATUS_ERROR } from "@/config";

// in milliseconds
const FETCH_TIMEOUT = 10000;

// prop type
type Props = {
    url: string;
    method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    auth?: string;
    body?: any;
};

// automatically merge update objects into state
const useLegacyState = (initialState: any) =>
    useReducer(
        (state: any, update: any) => ({ ...state, ...update }),
        initialState
    );

const initialFetchState = {
    isLoading: false,
    isError: false,
    fetchStarted: false,
};

export function useFetchEffieBENew(): [any, any] {
    const [state, setState] = useLegacyState(initialFetchState);
    const [previousProps, setPreviousProps] = useState<any>({});
    const useCalled = ({ auth, url = "", method = "GET", body }: Props) => {
        setState({
            isError: false,
            isLoading: true,
            fetchStarted: true,
        });

        const headers: any = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        if (auth) {
            headers["Authorization"] = auth;
        } else {
            // get from cookie
            const cookie = document.cookie;
            const cookieArr = cookie.split(";");
            const token = cookieArr.find((item) =>
                item.includes(EFFIE_AUTH_TOKEN)
            );
            if (token) {
                headers["Authorization"] = token.split("=")[1];
            }
        }

        const options = {
            method,
            headers,

            body:
                method === "POST" || method === "PUT" || method === "PATCH"
                    ? JSON.stringify(body)
                    : undefined,
        };
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                setState({
                    isLoading: false,
                    isError: data.status === BE_STATUS_ERROR,
                    response: data,
                });
            })
            .catch((err) => {
                setState({
                    isLoading: false,
                    isError: true,
                    response: err,
                });
            });
    };

    return [state, useCalled];
}
