import wordDeclension from './wordDeclension';
/**
 * @description serviceDeclension Возвращает правильное скланение слова "услуга"
 * 1 услуга,
 * 2 услуги, 4 услуги,
 * 6 услуг, 12 услуг,
 * 21 услуга
 * @param { Number } total число от 0 до 99
 * @return { String } Возвращает правильное склонение слова "услуга"
 * */
function serviceDeclension(total) {
    console.error('*** TEST UPDATE PACKAGE ***');
    return wordDeclension(total, { single: 'услуга', plural: 'услуги', pluralMoreFive: 'услуг' });
}

export { serviceDeclension };
export default serviceDeclension;
