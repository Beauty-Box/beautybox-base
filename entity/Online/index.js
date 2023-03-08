import { Provider } from '../Provider';
import { BUNDLER_AGNOSTIC_ENV } from './../helpers';

export class Online extends Provider {
    constructor(addressID) {
        super({
            BASE_URL: BUNDLER_AGNOSTIC_ENV.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });

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
        formData.append('editableUntil', 6);
        formData.append('recordNotPrev', 1);
        formData.append('active', 1);

        return this._provider.post('/settings/online', formData);
    }

    update(settingsID, { recordNotPrev, editableUntil }) {
        return this._provider.put(`/settings/online/${settingsID}`, {
            addressID: this.addressID,
            recordNotPrev,
            editableUntil,
        });
    }
}
