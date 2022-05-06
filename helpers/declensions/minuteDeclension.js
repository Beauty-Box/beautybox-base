import wordDeclension from './wordDeclension';
/**
 * @description hourDeclension Возвращает правильное скланение слова "минута"
 * 1 минута,
 * 2 минуты, 4 минуты,
 * 6 минут, 12 минут,
 * 21 минута
 * @param { Number } total число от 0 до 99
 * @return { String } Возвращает правильное склонение слова "минута"
 * */
function minuteDeclension(total) {
    return wordDeclension(total, { single: 'минута', plural: 'минуты', pluralMoreFive: 'минута' });
}

export { minuteDeclension };
export default minuteDeclension;
