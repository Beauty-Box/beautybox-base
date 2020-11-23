/**
 * @description Этот метод отвечает за создание объекта с зеркальным ключом и значениями.
 * а также добавить префикс к значениям, если есть
 * @param {Array<string>} arr Массив строк
 * @param {string} prefix префикс
 * @returns {Object} объект с зеркальными ключами, сгенерированный из массива строк
 */
const reflectKeys = (arr = [], prefix) =>
    arr.reduce((obj, key) => {
        obj[key] = prefix ? prefix + ' ' + key : key;

        return obj;
    }, {});

export { reflectKeys };
export default reflectKeys;
