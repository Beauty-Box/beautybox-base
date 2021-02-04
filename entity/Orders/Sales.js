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
}

export { Sales };
export default { Sales };
