/**
 * @description genNumberStringArray Возвращает массив чисел в виде строки формата ['0', '1', '2']
 * @param {Number} from начало
 * @param {Number} to конец
 * @return {Array<String>}
 * */
function genNumberStringArray(from, to) {
    let array = [];
    for (let i = from; i <= to; i++) {
        array.push(`${i}`);
    }
    return array;
}

export { genNumberStringArray };
export default genNumberStringArray;
