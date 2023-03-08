import { Provider } from '../Provider';
import { BUNDLER_AGNOSTIC_ENV } from './../../helpers';

export class Bids extends Provider {
    constructor() {
        super({
            BASE_URL: BUNDLER_AGNOSTIC_ENV.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
        this.coming = [];
        this.past = [];
        this.today = [];
        this.tomorrow = [];
    }
}
