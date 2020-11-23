/**
 * @description genDayArrayForSelect Возвращает массив чисел в виде строки формата [{ text: 1, value: '01'}]
 @param {Number} to
 * */
function genDayArrayForSelect(to) {
    let array = [];
    for (let i = 1; i <= to; i++) {
        array.push({
            text: i,
            value: i.toString().padStart(2, '0'),
        });
    }
    return array;
}

export { genDayArrayForSelect };
export default genDayArrayForSelect;
