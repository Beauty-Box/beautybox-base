/**
 * @description genDayArrayForSelect Возвращает массив чисел в виде строки формата [{ text: 1, value: '01'}]
 @param {Number} to
 * */
function genDayArrayForSelect(to) {
    if (!Number.isInteger(to)) {
        throw new TypeError('Аргумент number должен быть целым');
    }

    if (to < 0) {
        throw 'Передаваемый параметр не должен быть меньше 0';
    }
    if (to > 31) {
        throw 'Передаваемый параметр не должен превышать максимальное число дней в месяце (31)';
    }
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
