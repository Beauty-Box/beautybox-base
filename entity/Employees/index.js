import { Provider } from '../Provider';

export class Employees extends Provider {
    constructor() {
        super({ BASE_URL: process.env.BASE_URL, module: 'crm', token: localStorage.getItem('access_token') });
    }

    employees() {
        return this._provider.get('/employees');
    }
}
