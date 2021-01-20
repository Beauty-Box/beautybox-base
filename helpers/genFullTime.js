function genFullTime(fromHour = 0, stepMinute = 15) {
    if (!Number.isInteger(fromHour)) {
        throw new TypeError('Аргумент fromHour должен быть целым числом');
    }

    if (fromHour > 24) {
        throw new TypeError('Аргумент fromHour не может быть больше 24');
    }

    if (!Number.isInteger(stepMinute)) {
        throw new TypeError('Аргумент stepMinute должен быть целым числом');
    }
    if (60 % stepMinute !== 0) {
        throw new TypeError(
            'Невозможно создать массив с заданым шагом. Шаг должен делить 60 без остатка'
        );
    }

    const arr = [];
    for (let i = fromHour; i < 24 + fromHour; i++) {
        const time = i < 24 ? i : i - 24;
        for (let r = 0; r < 60; r += stepMinute) {
            arr.push(`${time.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`);
        }
    }
    return arr;
}

export { genFullTime };
export default genFullTime;
