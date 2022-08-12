import { Api } from '../../api';
import { setAuthToken } from '../../utils/auth';
import { logoutAll } from '../../utils/temporary';

let provider;

function init(config) {
    provider = new Api(config.BASE_URL, 'crm', config.token);
}

const ACCOUNTS_STORAGE_KEY = 'accounts';

export const state = () => ({
    // { name: '', address: '', avatar: '', notifications: 0, token: '', userID: 0 }
    accounts: [],
});

export const mutations = {
    SET_ACCOUNTS(state, data) {
        state.accounts = [...data];
    },
    SAVE_TO_STORAGE(state) {
        const accounts = JSON.stringify(state.accounts);
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, accounts);
    },
};

export const actions = {
    async LOAD_FROM_STORAGE({ commit, state }) {
        const accounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (!!accounts) {
            commit('SET_ACCOUNTS', JSON.parse(accounts));
        } else {
            commit('SET_ACCOUNTS', []);
        }
    },
    async ADD_ACCOUNT({ commit, state, rootGetters, getters, dispatch }) {
        const currentProfile = rootGetters.USER_INFO;
        const accounts = [...state.accounts];
        const foundAccount = accounts.some((account) => account.userID === currentProfile.userID);
        // если не найден текущий аккаунт в локал сторейдже то добавить текущий
        if (!foundAccount) {
            const newAccount = getters.CURRENT_ACCOUNT;
            accounts.push(newAccount);
            commit('SET_ACCOUNTS', accounts);
            commit('SAVE_TO_STORAGE');
        } else {
            // если аккаунт найден при загрузке мы проверяем его данные на изменения
            console.log('checking account for changes on add');
            await dispatch('CHECK_CHANGE_ACCOUNT');
        }
    },
    async REMOVE_ACCOUNT({ commit, state, rootGetters, dispatch }, id) {
        const accounts = [...state.accounts];
        const currentUserId = rootGetters.USER_ID;
        const index = accounts.findIndex((account) => account.userID === id);
        accounts.splice(index, 1);
        if (id === currentUserId) {
            if (!!accounts.length) {
                const newAccountId = accounts[0].userID;
                await dispatch('CHANGE_ACCOUNT', newAccountId);
                commit('SET_ACCOUNTS', accounts);
                commit('SAVE_TO_STORAGE');
                window.location.replace(window.location.pathname);
            }
        }
        if (!!accounts.length) {
            commit('SET_ACCOUNTS', accounts);
            commit('SAVE_TO_STORAGE');
        } else {
            console.log('accounts none');
            logoutAll();
        }
    },
    async CHANGE_ACCOUNT({ commit, state }, id) {
        const accounts = [...state.accounts];
        const account = accounts.find((account) => account.userID === id);
        if (!!account) {
            setAuthToken(account.token);
        }
    },

    async UPDATE_CURRENT_ACCOUNT({ commit, state, getters, rootGetters }) {
        const accounts = [...state.accounts];
        const currentUserId = rootGetters.USER_ID;
        const index = accounts.findIndex((account) => account.userID === currentUserId);
        accounts[index] = { ...getters.CURRENT_ACCOUNT };
        commit('SET_ACCOUNTS', accounts);
        commit('SAVE_TO_STORAGE');
    },

    async CHECK_CHANGE_ACCOUNT({ state, getters, rootGetters, dispatch }) {
        const accounts = [...state.accounts];
        const currentUserId = rootGetters.USER_ID;
        const storedAccount = accounts.find((account) => account.userID === currentUserId);
        // если аккаунт с текущим ид есть в локал сторейдже
        if (!!storedAccount) {
            const currentAccount = { ...getters.CURRENT_ACCOUNT };
            console.log('storedAccount', storedAccount);
            console.log('currentAccount', currentAccount);
            const isChanged = JSON.stringify(storedAccount) !== JSON.stringify(currentAccount);
            // и если в нем было изменено хотя бы одно поле (включая токен)
            if (isChanged) {
                console.log('change account detected');
                // обновляем хранмые аднные о текущем аккаунте
                await dispatch('UPDATE_CURRENT_ACCOUNT');
            }
        }
    },
};

export const getters = {
    ACCOUNTS: (state) => state.accounts,
    CURRENT_ACCOUNT: (state, getters, rootState, rootGetters) => {
        console.log('rootGetters', rootGetters);
        const currentProfile = rootGetters.USER_INFO;
        const currentNotifications = rootGetters.UNREAD;
        console.log('currentNotifications', currentNotifications);
        const name = currentProfile.name;
        const profileAddress = currentProfile.addresses[0];
        let address = '';
        address += profileAddress.city.name ? `${profileAddress.city.name}, ` : '';
        address += profileAddress.street ? `${profileAddress.street}, ` : '';
        address += profileAddress.house ? `${profileAddress.house}` : '';
        const avatar = currentProfile.avatar;
        const notifications = currentNotifications;
        const userID = currentProfile.userID;
        const token = provider.provider.token;
        console.log('token', provider.provider.token);
        return { userID, name, address, avatar, notifications, token };
    },
};

export default { init, state, mutations, actions, getters };
