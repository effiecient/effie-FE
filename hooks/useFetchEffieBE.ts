import { useReducer } from "react";
import { BE_STATUS_ERROR } from "@/config";
import { getEffieAuthTokenFromCookie } from "@/helper";

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
};

export function useFetchEffieBE(): [any, any] {
    const [state, setState] = useLegacyState(initialFetchState);
    const useCalled = ({ auth, url = "", method = "GET", body }: Props) => {
        setState({
            isError: false,
            isLoading: true,
        });

        const headers: any = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        headers["Authorization"] =
            auth === undefined ? getEffieAuthTokenFromCookie() : auth;

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
