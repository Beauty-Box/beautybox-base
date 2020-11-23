/**
 * @description RuToIso Возвращает дату в формате 2020-01-31
 * @param {String} date формат '31.01.2020'
 * @return {String, Null}
 * */
function RuToIso(date) {
    if (!date) {
        return null;
    }
    const [day, month, year] = date.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export { RuToIso };
export default RuToIso;
