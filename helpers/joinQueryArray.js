export function joinQueryArray(params) {
    // const query = Object.keys(params)
    //     .map((key) => {
    //         const value = params[key];
    //
    //         if (params.constructor === Array) {
    //             key = `${prefix}[]`;
    //         } else if (params.constructor === Object) {
    //             key = prefix ? `${prefix}[${key}]` : key;
    //         }
    //
    //         if (typeof value === 'object') {
    //             if (Array.isArray(value)) {
    //                 if (value.length === 0) {
    //                     return '';
    //                 }
    //             }
    //             return joinQueryArray(value, key);
    //         } else {
    //             return `${key}=${encodeURIComponent(value)}`;
    //         }
    //     })
    //     .filter((pair) => pair.length > 0);
    //
    // return [].concat.apply([], query).join('&');
    const query = [];

    for (let key in params) {
        if (!!params[key]) {
            if (Array.isArray(params[key])) {
                for (let value of params[key]) {
                    query.push(`${key}[]=${value}`);
                }
            } else {
                query.push(`${key}=${params[key]}`);
            }
        }
    }
    return query.join('&');
}

export default joinQueryArray;
