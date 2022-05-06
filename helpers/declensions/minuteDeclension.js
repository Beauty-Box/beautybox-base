import wordDeclension from './wordDeclension';
/**
 * @description minuteDeclension Возвращает правильное скланение слова "минута"
 * 1 минуту,
 * 2 минуты, 4 минуты,
 * 6 минут, 12 минут,
 * 21 минуту
 * @param { Number } total число от 0 до 99
 * @return { String } Возвращает правильное склонение слова "минута"
 * */
function minuteDeclension(total) {
    return wordDeclension(total, { single: 'минуту', plural: 'минуты', pluralMoreFive: 'минут' });
}

export { minuteDeclension };
export default minuteDeclension;
