export function checkIfObjectSame(obj1: any, obj2: any): Boolean {
    if (obj1 === undefined || obj2 === undefined) {
        return false;
    }
    // order the key
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();
    // check if the keys are the same
    if (obj1Keys.join("") === obj2Keys.join("")) {
        // check if the values are the same
        const isSame: Boolean = obj1Keys.every((key: any) => {
            // check type
            if (typeof obj1[key] === "object") {
                // recursive call
                return checkIfObjectSame(obj1[key], obj2[key]);
            }
            return obj1[key] === obj2[key];
        });

        return isSame;
    }
    return false;
}

export function getObjectDifferences(base: any, target: any) {
    if (base === undefined || target === undefined) {
        return {};
    }

    const result: any = {};
    Object.keys(target).forEach((key) => {
        // check type
        if (typeof target[key] === "object") {
            // recursive call
            const diff = getObjectDifferences(base[key], target[key]);
            if (Object.keys(diff).length > 0) {
                result[key] = diff;
            }
        } else {
            if (base[key] !== target[key]) {
                result[key] = target[key];
            }
        }
    });
    return result;
}
