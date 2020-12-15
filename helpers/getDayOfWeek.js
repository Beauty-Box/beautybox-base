/**
 * @description getDayOfWeek Возвращает текущий день недели в зависимости от переданной даты
 * @param {Date<String>} date формат '2020-01-31'
 * @return {(String|Null)}
 * */
function getDayOfWeek(date) {
    return new Date(date).toLocaleString('ru-RU', { weekday: 'long' });
}

export { getDayOfWeek };
export default getDayOfWeek;
