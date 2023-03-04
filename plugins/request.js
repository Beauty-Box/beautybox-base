import { Api } from '../api';
let provider;

export function useApi() {
    return { provider };
}

export default {
    install(Vue, options) {
        provider = new Api(options.BASE_URL, options.module, options.token, options.secure);
        Vue.prototype.$fetch = provider;
    },
};
