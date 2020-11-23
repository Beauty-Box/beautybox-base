import { hoursLocalTest } from './hoursLocalTest';

/**
 * @description convert Возвращает время формата 1 час 15 минут или 1 ч 15 мин
 * @param {Number} number лимит от 0 до 99 включительно
 * @param {Boolean} short формат времени
 * */
function convertMinutesToHours(number, short = false) {
    const hours = Math.floor(number / 60);
    const minute = hours * 60;
    const remainder = (number - minute) % 60;
    return `${hours ? hours + ' ' + (short ? 'ч' : hoursLocalTest(hours)) : ''}${
        remainder ? ' ' + remainder + (short ? ' мин' : ' минут') : ''
    }`;
}

export { convertMinutesToHours };
export default convertMinutesToHours;
