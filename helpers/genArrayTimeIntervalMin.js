import { hoursLocalTest } from './hoursLocalTest';

/**
 * @typedef { Object } DateItem
 * @property { String } text 15 минут
 * @property { Number } value 15
 * */

/**
 * @description genArrayTimeIntervalMin Возвращает массив формата [{text: 15 минут, value: 15}]
 * @param {Number} number лимит от 0 до 99 включительно
 * @param {Number} interval интервал в минутах
 * @param {boolean} short флаг показывающий нужно ли сокращенное слово "минуты"
 * @return { Array<DateItem> }
 * */
function genArrayTimeIntervalMin(number, interval = 15, short = false) {
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
    let steps = Math.floor(number / interval);
    let array = [];

    for (let i = 1; i <= steps; i++) {
        const step = i * interval;
        const hours = Math.floor(step / 60);
        const minutes = step % 60;
        array.push({
            text: `${hours ? hours + ' ' + hoursLocalTest(hours) : ''}${
                minutes ? ' ' + minutes + (short ? ' мин' : ' минут') : ''
            }`,
            value: step,
        });
    }
    return array;
}

export { genArrayTimeIntervalMin };
export default genArrayTimeIntervalMin;
