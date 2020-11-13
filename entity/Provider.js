import { Api } from '../api';

export class Provider {
    constructor(config) {
        this.baseUrl = config.BASE_URL;
        this.module = config.module;
        this.setProvider(this.baseUrl, this.module, config.token);
    }

    setProvider(baseUrl, module, token) {
        this._provider = new Api(baseUrl, module, token);
    }
}
