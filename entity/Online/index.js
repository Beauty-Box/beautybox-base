import { Provider } from '@beautybox/entity/Provider';

export class Online extends Provider {
    constructor() {
        super('crm');
    }

    params() {
        return this._provider.get('/settings/online/params');
    }

    edit(addressID) {
        if (!addressID) {
            throw new TypeError('addressID is undefined');
        }

        return this._provider.get(`/settings/online/${addressID}/edit`);
    }

    update(addressID, recordNotPrev, settingsID) {
        if (!addressID) {
            throw new TypeError('addressID is undefined');
        }

        return this._provider.put(`/settings/online/${settingsID}`, {
            addressID,
            recordNotPrev,
        });
    }
}
