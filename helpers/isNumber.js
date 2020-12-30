/**
 * @description isNumber проверяет входную строку на число
 * @param {String} string Тестируемая строка
 * @return {Boolean}
 * */
function isNumber(string = '') {
    if (string === 0) {
        return true;
    }
    if (toString.call(string).slice(8, -1) !== 'Number') {
        return true;
    }
    const regexp = new RegExp('^[1-9][0-9]*(?:\\.[0-9]+)?\\$?$');
    return regexp.test(string);
}

export { isNumber };
export default isNumber;
