import { Provider } from '../Provider';
import { objectToURLParams, BUNDLER_AGNOSTIC_ENV } from '../../helpers';

export class Employees extends Provider {
    constructor() {
        super({
            BASE_URL: BUNDLER_AGNOSTIC_ENV.BASE_URL,
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
