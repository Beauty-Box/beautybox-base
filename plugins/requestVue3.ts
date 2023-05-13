import { Api } from '../api';
let provider;

export function useApi() {
    return { provider };
}

export default {
    install(app: any, options: any) {
        provider = new Api(options.BASE_URL, options.module, options.token, options.secure);
        app.config.globalProperties.$fetch = provider;
    },
};
