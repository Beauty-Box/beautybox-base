import { Api } from '../../api';
import config from '../../config';
import { parseJwt } from '../../router/utils';

let provider = new Api(config.BASE_URL, 'crm');

export const state = () => ({
    userInfo: {},
    userID: 0,
});

export const mutations = {
    SET_USER_ID(state) {
        let token = localStorage.getItem('access_token');
        let obj = parseJwt(token);
        state.userID = obj.userID;
    },

    SET_USER_INFO(state, object) {
        state.userInfo = object;
    },

    CLEAR_USER_INFO(state) {
        state.userInfo = {};
    },
};

export const actions = {
    async GET_USER_INFO({ commit }) {
        let { errors = {}, ...response } = await provider.get('/user-info');

        if (!Object.keys(errors).length) {
            commit('SET_USER_INFO', response);
            commit('SET_USER_ID');
        }

        /*const step = response.step;

        if (step) {
            /!*if (!response.phoneActive) {
                if (window.location.pathname.includes('sign')) {
                    return;
                } else {
                    window.localStorage.setItem(
                        'from',
                        window.location.pathname + window.location.search
                    );

                    window.location.href = `/auth/sign-in?from=${window.location.href}`;
                    return;
                }
            }*!/
            /!*if (!window.location.pathname.includes(step)) {
                let query;
                const from = window.localStorage.getItem('from');

                if (from) {
                    query = `?from=${from}`;
                }
                window.location.href = `/auth/steps/${step}${query}`;
            }*!/
        }*/
    },
};

export const getters = {
    USER_INFO: (state) => state.userInfo,
    USER_INFO_ROLE: (state) => state.userInfo.role,
    USER_ID: (state) => state.userInfo.userID,
    PERMISSIONS: (state) => state.userInfo.permission || [],
    CHECK_PERMISSION: (state) => (permission) => {
        const temp = state.userInfo;
        const test = (item) => temp.permission.indexOf(item) !== -1;
        if (Object.keys(temp).length && temp.hasOwnProperty('permission')) {
            if (typeof permission === 'string') {
                return test(permission);
            } else if (Array.isArray(permission)) {
                return !!permission.find((item) => {
                    return test(item);
                });
            }
        }
        return false;
    },
    PAGE_LIST: (state) => {
        if (Object.keys(state.userInfo).length) {
            return state.userInfo.sidebarItems.reduce(
                (res, item) => ({ ...res, ...item.menu }),
                {}
            );
        } else {
            return {};
        }
    },
};

export default { state, mutations, actions, getters };
