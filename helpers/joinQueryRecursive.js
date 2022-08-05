export function joinQueryRecursive(params, prefix = '') {
    const query = Object.keys(params)
        .map((key) => {
            const value = params[key];

            if (params.constructor === Array) {
                key = `${prefix}[]`;
            } else if (params.constructor === Object) {
                key = prefix ? `${prefix}[${key}]` : key;
            }

            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        return '';
                    }
                }
                return joinQueryRecursive(value, key);
            } else {
                return `${key}=${encodeURIComponent(value)}`;
            }
        })
        .filter((pair) => pair.length > 0);

    return [].concat.apply([], query).join('&');
}

export default joinQueryRecursive;
