/**
 * @description RuToIso Возвращает дату в формате 2020-01-31
 * @param {String} date формат '31.01.2020'
 * @return {String, Null}
 * */
function RuToIso(date) {
    if (typeof date !== 'string' || !date.match(/^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/)) {
        throw new TypeError('Ожидалась дата формата ДД.ММ.ГГГГ');
    }
    const [day, month, year] = date.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export { RuToIso };
export default RuToIso;
