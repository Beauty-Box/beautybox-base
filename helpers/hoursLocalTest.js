/**
 * @description hoursLocalTest Возвращает правильное скланение часа
 * @param {Number} t диапазон от 0 до 99 включительно
 * */
function hoursLocalTest(t) {
    if (!(t >= 10 && t <= 20)) {
        let temp = t % 10;
        if (temp === 1) {
            return 'час';
        }
        if (temp > 1 && temp <= 4) {
            return 'часа';
        }
    }
    return 'часов';
}

export { hoursLocalTest };
export default hoursLocalTest;
