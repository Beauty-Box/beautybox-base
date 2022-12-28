import plural from 'plural-ru';

/**
 * @description financialDeclension Возвращает правильное скланение слова "финансовая операция"
 * 1 финансовая операция,
 * 2 финансовые операции, 4 финансовые операции,
 * 6 финансовых операций, 12 финансовых операций,
 * 21 финансовая операция
 * @param { Number } total число любое
 * @param genitive {Boolean} использовать родительный падеж
 * @return { String } Возвращает правильное склонение слова "финансовая операция"
 * */
function financialDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'финансовой операции', 'финансовых операций', 'финансовых операций');
    } else {
        return plural(total, 'финансовая операция', 'финансовые операции', 'финансовых операций');
    }
}

export { financialDeclension };
export default financialDeclension;
