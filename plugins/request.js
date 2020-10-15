import { Api } from '../api';

export default {
    install(Vue, options) {
        Vue.prototype.$fetch = new Api(options.BASE_URL, options.module);
    },
};
