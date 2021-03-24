/**
 * @description getFirstLastDayToWeek Возвращает первый и последний день недели
 * @param {String} date формат '2020-01-31'
 * */
function getFirstLastDayToWeek(date) {
    let tempDate = new Date(date);
    let first =
        tempDate.getDay() !== 0
            ? tempDate.getDate() - tempDate.getDay() + 1
            : tempDate.getDate() - 6;
    let last = first + 6;
    let firstDate = new Date(tempDate.setDate(first));

    let lastTime = tempDate.setDate(last);
    if (last < 7) {
        lastTime = tempDate.setMonth(tempDate.getMonth() + 1);
    }
    let lastDate = new Date(lastTime);
    return { first: firstDate, last: lastDate };
}

export { getFirstLastDayToWeek };
export default getFirstLastDayToWeek;
