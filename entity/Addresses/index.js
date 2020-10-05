import { Provider } from '@beautybox/entity/Provider';

export default class Addresses extends Provider {
    constructor() {
        super('crm');
    }

    addresses() {
        return this._provider.get('/addresses');
    }
}
