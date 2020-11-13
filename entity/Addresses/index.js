import { Provider } from '../Provider';

export default class Addresses extends Provider {
    constructor() {
        super({ BASE_URL: process.env.BASE_URL, module: 'crm' });
    }

    addresses() {
        return this._provider.get('/addresses');
    }
}
