import { Provider } from '@beautybox/entity/Provider';

export class Online extends Provider {
    constructor(addressID) {
        super('crm');

        if (!addressID) {
            throw new TypeError('addressID is undefined');
        }

        this.addressID = addressID;
    }

    params() {
        return this._provider.get('/settings/online/params');
    }

    edit() {
        return this._provider.get(`/settings/online/${this.addressID}/edit`);
    }

    create() {
        const formData = new FormData();

        formData.append('addressID', this.addressID);
        formData.append('recordNotLater', 1);
        formData.append('recordNotPrev', 1);
        formData.append('active', 1);

        return this._provider.post('/settings/online', formData);
    }

    update(addressID, recordNotPrev, settingsID) {
        return this._provider.put(`/settings/online/${settingsID}`, {
            addressID: this.addressID,
            recordNotPrev,
        });
    }
}
