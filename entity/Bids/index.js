import { Provider } from '../Provider';

export class Bids extends Provider {
    constructor() {
        super({
            BASE_URL: import.meta.env.VITE_BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
        this.coming = [];
        this.past = [];
        this.today = [];
        this.tomorrow = [];
    }
}
