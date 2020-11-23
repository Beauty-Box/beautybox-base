/**
 * @description Преобразовывает объект в строку для GET запроса
 * @param {Object} object Объект для преобразования
 * @return {String}
 */
function objectToURLParams(object) {
    return '?' + new URLSearchParams(object);
}

export { objectToURLParams };
export default objectToURLParams;
