import { ProviderClass } from '../../api';

class Sales extends ProviderClass {
    static async getPercent() {
        return await Sales._provider.get('/percent');
    }

    static async getLevel() {
        return await Sales._provider.get('/level');
    }

    static async getDiscount() {
        return await Sales._provider.get('/discount');
    }
}

export { Sales };
export default { Sales };
