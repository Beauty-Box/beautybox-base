import { TestStatus } from './TestStatus';
import { FetchApi as Provider } from './FetchApi';

export class BaseApi extends TestStatus {
    constructor(baseUrl, module) {
        super();
        this.baseUrl = baseUrl;
        this.module = module;
        this.setProvider();
    }
    setProvider() {
        this.provider = new Provider(this.baseUrl, this.module);
    }
}
