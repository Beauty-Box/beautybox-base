import request from '@beautybox/core/mixins/request';
import replaceToQuery from '@beautybox/core/mixins/replaceToQuery';

export default {
    install(Vue, options) {
        Vue.mixin(request);
        Vue.mixin(replaceToQuery);
    },
};
