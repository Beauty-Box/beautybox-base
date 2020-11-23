function genFullTime(fromHour = 0, stepMinute = 15) {
    let arr = [];
    for (let i = 0; i < 24; i++) {
        let time = i < 24 ? i : i - 24;
        for (let r = 0; r < 60; r += stepMinute) {
            arr.push(`${time.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`);
        }
    }
    return arr;
}

export { genFullTime };
export default genFullTime;
