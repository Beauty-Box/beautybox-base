import { request, replaceToQuery } from './mixins';

export default {
    install(Vue, options) {
        Vue.mixin(request);
        Vue.mixin(replaceToQuery);
    },
};
