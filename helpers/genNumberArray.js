/**
 * @description genNumberArray Возвращает массив чисел формата [0, 1, 2]
 * @param {Number} from начало
 * @param {Number} to конец
 * @return {Array<Number>}
 * */
function genNumberArray(from, to) {
    let array = [];
    for (let i = from; i <= to; i++) {
        array.push(i);
    }
    return array;
}

export { genNumberArray };
export default genNumberArray;
