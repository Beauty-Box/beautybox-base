/**
 * @description IsoToRu Возвращает дату в формате 31.01.2020
 * @param {String} date формат '2020-01-31'
 * */
function IsoToRu(date) {
    if (typeof date !== 'string' || !date.match(/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/)) {
        throw new TypeError('Ожидалась дата формата ГГГГ-ММ-ДД');
    }
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}

export { IsoToRu };
export default IsoToRu;
