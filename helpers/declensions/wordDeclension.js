/**
 * @description wordDeclension Возвращает правильное скланение переданного слова
 * 1 товар,
 * 2 товара, 4 товара,
 * 6 товаров, 12 товаов,
 * 21 товар
 * @param { Number } total число от 0 до 99
 * @param { Object } declensions объект строк, три словоформы для винительного падежа единственого и множественного числа,
 * и для множественного числа больше пяти
 * @return { String } Возвращает правильное склонение слова
 * */
function wordDeclension(total, { single, plural, pluralMoreFive }) {
    if (!(total >= 10 && total <= 20)) {
        let temp = total % 10;
        if (temp === 1) {
            return single;
        }
        if (temp > 1 && temp <= 4) {
            return plural;
        }
    }
    return pluralMoreFive;
}

export { wordDeclension };
export default wordDeclension;
