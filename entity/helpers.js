export function transformQuery(query = {}) {
    if (!Object.keys(query).length) {
        return '';
    }
    return Object.keys(query).reduce((acc, key) => {
        acc += '&' + key + '=' + query[key];
        return acc;
    }, '');
}
