/**
 * @description getDayOfWeek Возвращает текущий день недели в зависимости от переданной даты
 * @param {String} date формат '2020-01-31'
 * @return {(String|Null)}
 * */
function getDayOfWeek(date) {
    if (typeof date !== 'string' || !date.match(/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/)) {
        throw new TypeError('Ожидалась дата формата ГГГГ-ММ-ДД');
    }
    return new Date(date).toLocaleString('ru-RU', { weekday: 'long' });
}

export { getDayOfWeek };
export default getDayOfWeek;
