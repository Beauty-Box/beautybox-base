/**
 * @description Получить первый и последний день месяца в виде массива [ first, last ]
 */
function getFirstAndLastDayOfMonthAsRange() {
    const today = new Date();
    const firstDay = new Date(today.setDate(1));
    const lastDay = new Date(today.setMonth(today.getMonth() + 1, 0));

    return [firstDay.toISOString().slice(0, 10), lastDay.toISOString().slice(0, 10)];
}

export { getFirstAndLastDayOfMonthAsRange };
export default getFirstAndLastDayOfMonthAsRange;
