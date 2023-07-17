import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

let configSocket = {
    path: '/socket/notification',
    headers: new Headers({
        authorization: 'bearer ' + localStorage.getItem('access_token'),
    }),
};

export default {
    install(Vue, options) {
        const SOCKET_ON = import.meta.env.VITE_SOCKET_ON ?? 'true';
        if (SOCKET_ON === 'true') {
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
        }
    },
};
