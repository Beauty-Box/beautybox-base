/**
 * @description Получить вчерашний день в виде массива [ yesterday, yesterday ]
 */
function getYesterdayAsRange() {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    return [yesterday, yesterday];
}

export { getYesterdayAsRange };
export default getYesterdayAsRange;
