import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
import { BUNDLER_AGNOSTIC_ENV } from './../helpers';

let configSocket = {
    path: '/socket/notification',
    headers: new Headers({
        authorization: 'bearer ' + localStorage.getItem('access_token'),
    }),
};

export default {
    install(Vue, options) {
        Vue.use(
            new VueSocketIO({
                debug: false,
                connection: SocketIO(import.meta.env.VITE_SOCKET_NOTIFICATION, {
                    path: '/socket/notification',
                    query: {
                        token: localStorage.getItem('access_token'),
                    },
                }),
                vuex: {
                    store: options.store,
                    actionPrefix: 'SOCKET_',
                    mutationPrefix: 'SOCKET_',
                },
            })
        );
    },
};
