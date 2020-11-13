import { Api } from '../../api';

let provider;

function init(config) {
    provider = new Api(config.BASE_URL, 'crm', config.token);
}

export const state = () => ({
    userInfo: {},
});

export const mutations = {
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
        }
    },
};

export const getters = {
    USER_INFO: (state) => state.userInfo,
    USER_ADDRESS_ID: (state) => state.userInfo.addressID,
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

export default { init, state, mutations, actions, getters };
