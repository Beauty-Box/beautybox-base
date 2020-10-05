export function checkObjectsForIdentity(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (JSON.stringify(obj2) === JSON.stringify(obj1)) {
        return true;
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (let propName in obj1) {
        if (!obj2.hasOwnProperty(propName)) {
            return false;
        }
        if (
            typeof obj1[propName] === 'object' &&
            typeof obj2[propName] === 'object' &&
            obj1[propName].valueOf() !== obj2[propName].valueOf()
        ) {
            if (!checkObjectsForIdentity(obj1[propName], obj2[propName])) {
                return false;
            }
        }
    }
    return true;
}
