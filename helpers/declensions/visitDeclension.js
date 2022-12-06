import plural from 'plural-ru';

/**
 * @description visitDeclension Возвращает правильное скланение слова "визит"
 * 1 визит,
 * 2 визита, 4 визита,
 * 6 визитов, 12 визитов,
 * 21 визит
 * @param { Number } total число любое
 * @param genitive {Boolean} использовать родительный падеж
 * @return { String } Возвращает правильное склонение слова "визит"
 * */
function visitDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'визита', 'визитов', 'визитов');
    } else {
        return plural(total, 'визит', 'визита', 'визитов');
    }
}

export { visitDeclension };
export default visitDeclension;
