import { ProviderClass } from '../../../api';

class Loyalty extends ProviderClass {
    /** @description Запрос на получение текущей скидки
     *    @function
     *    @param { String } phone
     *    @returns {Number} percent
     * */
    static async getPercent(phone) {
        return await Loyalty._provider.get(`/loyalty/percent?phone=${phone}`);
    }

    /** @description Запрос на получение следующего уровня скидки
     *    @function
     *    @param { String } phone
     *    @returns {Number} next_level_percent, next_level_sum, progress_percent
     * */
    static async getLevel(phone) {
        return await Loyalty._provider.get(`/loyalty/level?phone=${phone}`);
    }

    /** @description Запрос на получение списка скидок
     *    @function
     *    @param { String } phone
     *    @returns {Array} discount_calculation
     * */
    static async getDiscount(phone) {
        return await Loyalty._provider.get(`/loyalty/discount?phone=${phone}`);
    }

    /** @description Получение штрихкода скидки
     *    @function
     *    @param { String } phone
     *    @param { Number } size
     *    @returns {String} Barcode
     * */
    static async getDiscountCard(phone = '', size = 3) {
        return await Loyalty._provider.get(
            `/loyalty/discount-card?phone=${phone}&width=${size}&height=${size}`
        );
    }

    /** @description Запрос на проверку есть ли пользователь в сервисе Мой склад
     *    @function
     *    @param { String } phone
     *    @returns {Boolean} check
     * */
    static async checkHasUser(phone) {
        return await Loyalty._provider.get(`/loyalty/check-user?phone=${phone}`);
    }
}

export { Loyalty };
export default { Loyalty };
