/**
 * @description genTime Возвращает массив времени формата 00:00 с заданым шагом
 * @param {Number} fromHour Начальное значение отсчета времени
 * @param {Number} toHour Конечное значение отчета времени
 * @param {Number} stepMinute Шаг времени
 * @return {Array}
 * */
function genTime(fromHour = 0, toHour = 24, stepMinute = 15) {
    let arr = [];
    for (let i = fromHour; i < toHour; i++) {
        for (let r = 0; r < 60; r += stepMinute) {
            arr.push(`${i.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`);
        }
    }
    return arr;
}

export { genTime };
export default genTime;
