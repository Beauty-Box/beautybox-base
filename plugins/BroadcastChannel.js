export default {
    install(Vue, options) {
        if ('BroadcastChannel' in window) {
            let chanel = new BroadcastChannel(options.name);
            chanel.addEventListener('message', e => {
                console.log(e);
            });
            window.addEventListener('unload', () => {
                chanel.close();
            });
            if (!Vue.hasOwnProperty('$chanel')) {
                Vue.prototype.$chanel = {};
            }
            Vue.prototype.$chanel[options.name] = chanel;
        } else {
            return false;
        }
    },
};
