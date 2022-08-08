export function joinQueryArray(params) {
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
