/**
 * @description getFirstLastDayToWeek Возвращает первый и последний день недели
 * @param {String} date формат '2020-01-31'
 * */
function getFirstLastDayToWeek(date) {
    const tempDate = new Date(date);
    const first =
        tempDate.getDay() !== 0
            ? tempDate.getDate() - tempDate.getDay() + 1
            : tempDate.getDate() - 6;
    const last = first + 6;
    const firstDate = new Date(tempDate.setDate(first));

    // const lastTime = last < 7 ? tempDate.setMonth(tempDate.getMonth() + 1) : tempDate.setDate(last);
    let lastTime = tempDate.setDate(last);
    if (last < 7) {
        lastTime = tempDate.setMonth(tempDate.getMonth() + 1);
    }
    const lastDate = new Date(lastTime);
    return { first: firstDate, last: lastDate };
}

export { getFirstLastDayToWeek };
export default getFirstLastDayToWeek;
