import { hoursLocalTest } from './hoursLocalTest';

/**
 * @description genArrayTime15min Возвращает массив формата [{text: 15 минут, value: 15}]
 * @param {Number} number лимит от 0 до 99 включительно
 * */
function genArrayTime15min(number) {
    if (number < 15) {
        return;
    }
    let steps = Math.floor(number / 15);
    let array = [];

    for (let i = 1; i <= steps; i++) {
        let step = i * 15;
        const hours = Math.floor(step / 60);
        const minutes = step % 60;
        array.push({
            text: `${hours ? hours + ' ' + hoursLocalTest(hours) : ''}${
                minutes ? ' ' + minutes + ' минут' : ''
            }`,
            value: step,
        });
    }
    return array;
}

export { genArrayTime15min };
export default genArrayTime15min;
