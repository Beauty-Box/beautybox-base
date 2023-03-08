import { Provider } from '../Provider';
import { BUNDLER_AGNOSTIC_ENV } from './../../helpers';

export default class Addresses extends Provider {
    constructor() {
        super({
            BASE_URL: BUNDLER_AGNOSTIC_ENV.BASE_URL || 'test',
            module: 'test',
            token: 'test',
        });
    }

    addresses() {
        return this._provider.get('/addresses');
    }
}
