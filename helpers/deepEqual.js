// функция проверяет равенство значений (включая объектоы) рекурсивно
// для того чтобы два объекта были равны нужно чтобы совпадало количество ключей, и чтобы значения всех ключей были равны

export function deepEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
        // If the values are Date, compare them as timestamps
        return false;
    }

    if (a !== Object(a) || b !== Object(b)) {
        // If the values aren't objects, they were already checked for equality
        return false;
    }

    const props = Object.keys(a);

    if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false;
    }

    return props.every((p) => deepEqual(a[p], b[p]));
}

export default deepEqual;
