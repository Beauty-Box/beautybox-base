/**
 * @description genNumberStringArrayRevert Возвращает массив чисел в виде строки формата ['2', '1', '0']
 * @param {Number} from начало
 * @param {Number} to конец
 * */
function genNumberStringArrayRevert(from, to) {
    let array = [];
    for (let i = to; i >= from; i--) {
        array.push(`${i}`);
    }
    return array;
}

export { genNumberStringArrayRevert };
export default genNumberStringArrayRevert;
