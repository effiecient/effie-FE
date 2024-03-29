import copyToClipboard from "./copyToClipboard";

export const stopEventPropagation = (event: any) => {
    event.stopPropagation();
};

export { copyToClipboard };

export { checkIfObjectSame, getObjectDifferences } from "./objectCheck";
