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
    async ADD_ACCOUNT({ commit, state, rootGetters }) {
        const currentProfile = rootGetters.USER_INFO;
        const accounts = [...state.accounts];
        const foundAccount = accounts.some((account) => account.userID === currentProfile.userID);
        // если не найден текущий аккаунт в локал сторейдже то добавить текущий
        if (!foundAccount) {
            const currentNotifications = rootGetters.UNREAD;
            console.log('currentNotifications', currentNotifications);
            const name = currentProfile.name;
            const profileAddress = currentProfile.addresses[0];
            const address = `${currentProfile.location.name}, ${profileAddress.street}, ${profileAddress.house}`;
            const avatar = currentProfile.avatar;
            const notifications = currentNotifications;
            const userID = currentProfile.userID;
            const token = provider.provider.token;
            console.log('token', provider.provider.token);
            const newAccount = { userID, name, address, avatar, notifications, token };

            accounts.push(newAccount);
            commit('SET_ACCOUNTS', accounts);
            commit('SAVE_TO_STORAGE');
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
            }
        }
        if (!accounts.length) {
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
        setAuthToken(account.token);
    },
};

export const getters = {
    ACCOUNTS: (state) => state.accounts,
};

export default { init, state, mutations, actions, getters };
