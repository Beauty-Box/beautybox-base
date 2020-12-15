import { hoursLocalTest } from './hoursLocalTest';

/**
 * @typedef { Object } DateItem
 * @property { String } text 15 минут
 * @property { Number } value 15
 * */

/**
 * @description genArrayTime15min Возвращает массив формата [{text: 15 минут, value: 15}]
 * @param {Number} number лимит от 0 до 99 включительно
 * @return { Array<DateItem> }
 * */
function genArrayTime15min(number) {
    if (!Number.isInteger(number)) {
        throw new TypeError('Аргумент number должен быть целым');
    }

    if (number < 0) {
        throw new TypeError('Число должно быть положительным');
    }

    if (number > 24 * 60) {
        throw new TypeError('Число слишком большое, что может привести к переполнению памяти');
    }

    if (number < 15) {
        return [];
    }
    let steps = Math.floor(number / 15);
    let array = [];

    for (let i = 1; i <= steps; i++) {
        const step = i * 15;
        const hours = Math.floor(step / 60);
        const minutes = step % 60;
        array.push({
            text: `${hours ? hours + ' ' + hoursLocalTest(hours) : ''}${
                minutes ? ' ' + minutes + ' минут' : ''
            }`,
            value: step,
        });
    }
    return array;
}

export { genArrayTime15min };
export default genArrayTime15min;
