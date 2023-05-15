/**
 * @description Преобразовывает объект в строку для GET запроса
 * @param {Object} object Объект для преобразования
 * @return {String}
 */
function objectToURLParams(object) {
    // TODO Лучше когда пустые параметры выкидываются при подстановке параметров
    const newObject = Object.fromEntries(
        Object.entries(object).filter(([, value]) => value !== null && value !== undefined)
    );
    return '?' + new URLSearchParams(newObject).toString();
}

export { objectToURLParams };
export default objectToURLParams;
