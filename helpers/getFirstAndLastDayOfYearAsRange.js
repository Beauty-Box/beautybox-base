/**
 * @description Получить первый и последний день в году в виде массива [ first, last ]
 */
function getFirstAndLastDayOfYearAsRange() {
    const today = new Date();
    const firstDay = new Date(today.setMonth(1, 1));
    const lastDay = new Date(today.setMonth(13, 0));

    return [firstDay.toISOString().slice(0, 10), lastDay.toISOString().slice(0, 10)];
}

export { getFirstAndLastDayOfYearAsRange };
export default getFirstAndLastDayOfYearAsRange;
