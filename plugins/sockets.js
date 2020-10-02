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
        Vue.use(
            new VueSocketIO({
                debug: false,
                connection: SocketIO(process.env.SOCKET_NOTIFICATION, {
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
