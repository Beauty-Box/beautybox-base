import plural from 'plural-ru';

/**
 * @description clientDeclension Возвращает правильное скланение слова "клиент"
 * 1 клиент,
 * 2 клиента, 4 клиента,
 * 6 клиентов, 12 клиентов,
 * 21 клиент
 * @param { Number } total число любое
 * @param genitive {Boolean} использовать родительный падеж
 * @return { String } Возвращает правильное склонение слова "клиент"
 * */
function clientDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'клиента', 'клиентов', 'клиентов');
    } else {
        return plural(total, 'клиент', 'клиента', 'клиентов');
    }
}

export { clientDeclension };
export default clientDeclension;
