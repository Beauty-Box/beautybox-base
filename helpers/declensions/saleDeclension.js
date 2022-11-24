import plural from 'plural-ru';

/**
 * @description saleDeclension Возвращает правильное скланение слова "продажа"
 * 1 продажа,
 * 2 продажи, 4 продажи,
 * 6 продаж, 12 продаж,
 * 21 продажа
 * @param { Number } total число любое
 * @param genitive {Boolean} использовать родительный падеж
 * @return { String } Возвращает правильное склонение слова "продажа"
 * */
function saleDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'продажи', 'продаж', 'продаж');
    } else {
        return plural(total, 'продажа', 'продажи', 'продаж');
    }
}

export { saleDeclension };
export default saleDeclension;
