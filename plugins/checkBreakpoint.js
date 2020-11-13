export default {
    install(Vue, store) {
        Vue.prototype.$isMobile = store.getters.isMobile;
    },
};
