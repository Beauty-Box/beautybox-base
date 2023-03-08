import { Provider } from '../Provider';
import { BUNDLER_AGNOSTIC_ENV } from './../helpers';

export default class Analytics extends Provider {
    constructor() {
        super({
            BASE_URL: BUNDLER_AGNOSTIC_ENV.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
    }

    analyze(queryString = '') {
        return this._provider.get(`/analytics/analyze${queryString}`);
    }

    statistics(queryString = '') {
        return this._provider.get(`/analytics/statistics${queryString}`);
    }

    occupancy(queryString = '') {
        return this._provider.get(`/analytics/occupancy${queryString}`);
    }

    recoverability(queryString = '') {
        return this._provider.get(`/analytics/recoverability${queryString}`);
    }

    clientsStatistics(queryString = '') {
        return this._provider.get(`/analytics/client-statistics${queryString}`);
    }
}
