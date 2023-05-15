/**
 * @description Преобразовывает объект в строку для GET запроса
 * @param {Object} object Объект для преобразования
 * @param {Boolean} dropEmpty Флаг указывающий следует ли хелперу выкидывать null и undefined
 * @return {String}
 */
function objectToURLParams(object, dropEmpty = false) {
    let newObject = {};
    if (dropEmpty) {
        newObject = Object.fromEntries(
            Object.entries(object).filter(([, value]) => value !== null && value !== undefined)
        );
    } else {
        newObject = { ...object };
    }
    return '?' + new URLSearchParams(newObject);
}

export { objectToURLParams };
export default objectToURLParams;
