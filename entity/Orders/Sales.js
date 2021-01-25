import { ProviderClass } from '../../api';

class Sales extends ProviderClass {
    static async getPercent() {
        return await Sales._provider.get('/market/percent');
    }

    static async getLevel() {
        return await Sales._provider.get('/market/level');
    }

    static async getDiscount() {
        return await Sales._provider.get('/market/discount');
    }
}

export { Sales };
export default { Sales };
