import { Provider } from '@beautybox/entity/Provider';

export default class Analytics extends Provider {
    constructor() {
        super('crm');
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