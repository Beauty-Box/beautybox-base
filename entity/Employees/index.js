import { Provider } from '../Provider';
import { objectToURLParams } from '../../helpers';

export class Employees extends Provider {
    constructor() {
        super({
            BASE_URL: import.meta.env.VITE_BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
    }

    employees({ filters = {}, skip = 0 } = {}) {
        const params = {};
        if (!!skip) {
            params.skip = skip;
        }

        for (const filterKey in filters) {
            if (!!filters[filterKey]) {
                params[filterKey] = filters[filterKey];
            }
        }

        return this._provider.get(`/employees${objectToURLParams(params)}`);
    }
}
