import { Provider } from '../Provider';
import { BUNDLER_AGNOSTIC_ENV } from './../helpers/bundlerAgnosticEnv';

export class Employees extends Provider {
    constructor() {
        super({
            BASE_URL: BUNDLER_AGNOSTIC_ENV.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
    }

    employees() {
        return this._provider.get('/employees');
    }
}
