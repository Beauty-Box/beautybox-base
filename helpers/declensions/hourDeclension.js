import wordDeclension from './wordDeclension';
/**
 * @description hourDeclension Возвращает правильное скланение слова "Час"
 * 1 Час,
 * 2 Часа, 4 Часа,
 * 6 Часов, 12 Часов,
 * 21 Час
 * @param { Number } total число от 0 до 99
 * @return { String } Возвращает правильное склонение слова "Час"
 * */
function hourDeclension(total) {
    return wordDeclension(total, { single: 'час', plural: 'часа', pluralMoreFive: 'часов' });
}

export { hourDeclension };
export default hourDeclension;
