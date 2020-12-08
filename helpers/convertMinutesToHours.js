import { hoursLocalTest } from './hoursLocalTest';

/**
 * @description convert Возвращает время формата 1 час 15 минут или 1 ч 15 мин
 * @param {Number} number лимит от 0 до 99 включительно
 * @param {Boolean} short формат времени
 * */
function convertMinutesToHours(number, short = false) {
    if (!Number.isInteger(number)) {
        throw new TypeError('Аргумент number должен быть целым');
    }

    if (number < 0) {
        throw new TypeError('Число должно быть положительным');
    }

    if (number === 0) {
        return '0';
    }
    const hours = Math.floor(number / 60);
    const minute = hours * 60;
    const remainder = (number - minute) % 60;
    return `${hours ? hours + ' ' + (short ? 'ч' : hoursLocalTest(hours)) : ''}${
        remainder ? ' ' + remainder + (short ? ' мин' : ' минут') : ''
    }`;
}

export { convertMinutesToHours };
export default convertMinutesToHours;
