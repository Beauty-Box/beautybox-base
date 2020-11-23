/**
 * @description joinQueryObj Возвращает строку queryString параметров вида ?query=1&query=2
 * @param {Object} queryObj принимаемы обьект вида { query: 1 }
 * @param {String} queryString принимаемая и возращаемая строка query параметров
 * */
function joinQueryObj(queryObj = {}, queryString = '') {
    let first = true;
    let symbol = queryString.length ? '&' : '?';

    if (!Object.keys(queryObj).length) {
        return '';
    }

    return Object.keys(queryObj).reduce((acc, key) => {
        if (first) {
            acc += symbol + key + '=' + queryObj[key];
        } else {
            acc += '&' + key + '=' + queryObj[key];
        }
        first = false;
        return acc;
    }, queryString);
}

export { joinQueryObj };
export default joinQueryObj;
