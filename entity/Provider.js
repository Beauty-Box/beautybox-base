import { Api } from '@beautybox/api';
import config from '@beautybox/core/config';

export class Provider {
    constructor(module) {
        this.baseUrl = config.BASE_URL;
        this.module = module;
        this.setProvider();
    }

    setProvider() {
        this._provider = new Api(this.baseUrl, this.module);
    }
}
