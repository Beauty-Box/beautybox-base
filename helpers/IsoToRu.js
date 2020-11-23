/**
 * @description IsoToRu Возвращает дату в формате 31.01.2020
 * @param {String} date формат '2020-01-31'
 * */
function IsoToRu(date) {
    if (!date) {
        return null;
    }
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}

export { IsoToRu };
export default IsoToRu;
