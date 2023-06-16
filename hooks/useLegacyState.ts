import { useState } from "react";


export function useLegacyState<T>(initialState: any) {
    // for object, only update key that is changed
    const [state, setState] = useState<T>(initialState);
    const setLegacyState: any = (
        newState: any,
        clearPreviousState: boolean = false
    ) => {
        setState((prevState: any) => {
            // if clear is true, then don't include the previous state
            if (clearPreviousState) {
                return {
                    ...newState,
                };
            } else {
                return {
                    ...prevState,
                    ...newState,
                };
            }
        });
    };
    return [state, setLegacyState];
}
