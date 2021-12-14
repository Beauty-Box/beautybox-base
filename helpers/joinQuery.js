/**
 * @description joinQuery Возвращает строку queryString параметров вида ?query=1&query=2
 * @param {String} uri принимаемы обьект вида { query: 1 }
 * @param {String} key ключ параметра
 * @param {String} value значение параметра
 * */
function joinQuery(uri = '', key = '', value = '') {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
        return uri + separator + key + '=' + value;
    }
}

export { joinQuery };
export default joinQuery;
