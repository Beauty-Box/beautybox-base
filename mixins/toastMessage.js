import Toasted from 'vue-toasted/dist/vue-toasted.min';

const options = {
    position: 'top-center',
    className: 'c-toast',
    iconPack: 'material',
};

const mixin = {
    methods: {
        /**
         * messageSuccess Сообщение со статусом success
         * @param {String} text
         * @param {Number} timeout
         * */
        messageSuccess(text, timeout = 2000) {
            this.$toasted.success(text, {
                ...options,
                duration: timeout,
                icon: 'check_circle_outline',
            });
        },
        /**
         * messageError Сообщение со статусом error
         * @param {String} text
         * @param {Number} timeout
         * */
        messageError(text, timeout = 2000) {
            this.$toasted.error(text, {
                ...options,
                duration: timeout,
                icon: 'error_outline',
            });
        },
    },
};

export default {
    install(Vue) {
        Vue.use(Toasted);
        Vue.mixin(mixin);
    },
};
