import { ProviderClass } from '../../api';

class Sales extends ProviderClass {
    static async getPercent(phone) {
        return await Sales._provider.get(`/loyalty/percent?phone=${phone}`);
    }

    static async getLevel(phone) {
        return await Sales._provider.get(`/loyalty/level?phone=${phone}`);
    }

    static async getDiscount(phone) {
        return await Sales._provider.get(`/loyalty/discount?phone=${phone}`);
    }

    /** @description Получение штрихкода скидки
     *    @function
     *    @param { String } phone
     *    @param { Number } size
     *    @returns {String} Barcode
     * */
    static async getDiscountCard(phone = '', size = 3) {
        return await Sales._provider.get(
            `/loyalty/discount-card?phone=${phone}&width=${size}&height=${size}`
        );
    }
}

export { Sales };
export default { Sales };
