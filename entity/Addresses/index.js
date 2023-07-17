import { Provider } from '../Provider';

export default class Addresses extends Provider {
    constructor() {
        super({
            BASE_URL: import.meta.env.VITE_BASE_URL || 'test',
            module: 'test',
            token: 'test',
        });
    }

    addresses() {
        return this._provider.get('/addresses');
    }
}
