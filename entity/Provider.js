import { Api } from '../api';

export class Provider {
    constructor(config) {
        this.baseUrl = config.BASE_URL;
        this.module = config.module;
        this.setProvider();
    }

    setProvider() {
        this._provider = new Api(this.baseUrl, this.module);
    }
}
