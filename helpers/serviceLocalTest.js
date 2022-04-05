/**
 * @description hoursLocalTest Возвращает правильное скланение часа
 * @param {Number} t диапазон от 0 до 99 включительно
 * */
function serviceLocalTest(t) {
    if (!(t >= 10 && t <= 20)) {
        let temp = t % 10;
        if (temp === 1) {
            return 'услуга';
        }
        if (temp > 1 && temp <= 4) {
            return 'услуги';
        }
    }
    return 'услуг';
}

export { serviceLocalTest };
export default serviceLocalTest;
