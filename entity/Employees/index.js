import { Provider } from '../Provider';

export class Employees extends Provider {
    constructor() {
        super('crm');
    }

    employees() {
        return this._provider.get('/employees');
    }
}
