import plural from 'plural-ru';

/**
 * @description productDeclension Возвращает правильное скланение слова "товар"
 * 1 товар,
 * 2 товара, 4 товара,
 * 6 товаров, 12 товаров,
 * 21 товар
 * @param { Number } total число любое
 * @param genitive {Boolean} использовать родительный падеж
 * @return { String } Возвращает правильное склонение слова "товар"
 * */
function productDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'товара', 'товаров', 'товаров');
    } else {
        return plural(total, 'товар', 'товара', 'товаров');
    }
}

export { productDeclension };
export default productDeclension;
