import { getFirstLastDayToWeek } from './getFirstLastDayToWeek';

/**
 * @description Получить первый и последний день недели в виде массива [first, last]
 */
function getFirstLastDayToWeekAsRange() {
    const firstAndLastDay = getFirstLastDayToWeek(new Date());
    return [
        firstAndLastDay.first.toISOString().slice(0, 10),
        firstAndLastDay.last.toISOString().slice(0, 10),
    ];
}

export { getFirstLastDayToWeekAsRange };
export default getFirstLastDayToWeekAsRange;
