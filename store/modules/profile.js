import { Api } from '../../api';
import { normalizeTimestamp } from '../../helpers/normalizeTimestamp';

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
        return response;
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
    CHECK_WHATSAPP_MODULE: (state) => {
        const whatsappIntegration = state.userInfo?.integrations?.find((integration) => {
            return integration.alias === 'whatsapp_notification';
        });
        return whatsappIntegration?.active ?? false;
    },
    TARIFF: (state) => state.userInfo?.tariff ?? {},
    IS_TARIFF_FREE: (state, getters) => {
        return (
            getters.TARIFF.id === 0 &&
            !getters.TARIFF.expirationTrialDate &&
            !getters.TARIFF.expirationDate
        );
    },
    IS_TARIFF_CANCELED: (state, getters) => {
        return getters.TARIFF.id !== 0 && !!getters.TARIFF.canceledDate;
    },
    IS_TARIFF_TRIAL: (state, getters) => {
        return getters.TARIFF.id !== 0 && !!getters.TARIFF.expirationTrialDate;
    },
    IS_TARIFF_STANDART: (state, getters) => {
        return getters.TARIFF.id !== 0 && !!getters.TARIFF.expirationDate;
    },
    IS_TARIFF_EXPIRED: (state, getters) => {
        if (getters.IS_TARIFF_FREE) {
            return false;
        }
        const now = new Date();
        let canceledTimestamp = getters.TARIFF.canceledDate;
        let canceledDate = null;
        if (!!canceledTimestamp) {
            canceledTimestamp = normalizeTimestamp(canceledTimestamp);
            canceledDate = new Date(`${canceledTimestamp}${getters.TARIFF.timezone}`);
        }
        if (getters.IS_TARIFF_TRIAL) {
            let expirationTrialTimestamp = getters.TARIFF.expirationTrialDate;
            let expirationTrialDate = null;
            if (!!expirationTrialTimestamp) {
                expirationTrialTimestamp = normalizeTimestamp(expirationTrialTimestamp);
                expirationTrialDate = new Date(
                    `${expirationTrialTimestamp}${getters.TARIFF.timezone}`
                );
            }

            if (canceledDate) {
                return now > canceledDate;
            }
            return now > expirationTrialDate;
        }
        if (getters.IS_TARIFF_STANDART) {
            let expirationTimestamp = getters.TARIFF.expirationDate;
            let expirationDate = null;
            if (!!expirationTimestamp) {
                expirationTimestamp = normalizeTimestamp(expirationTimestamp);
                expirationDate = new Date(`${expirationTimestamp}${getters.TARIFF.timezone}`);
            }

            if (canceledDate) {
                return now > canceledDate;
            }
            return now > expirationDate;
        }
        return true;
    },
    IS_TARIFF_NEAREST_END_DATE: (state, getters) => {
        if (getters.IS_TARIFF_FREE) {
            return null;
        }

        if (getters.IS_TARIFF_CANCELED) {
            return new Date(
                `${normalizeTimestamp(getters.TARIFF.canceledDate)}${getters.TARIFF.timezone}`
            );
        }

        if (getters.IS_TARIFF_TRIAL) {
            return new Date(
                `${normalizeTimestamp(getters.TARIFF.expirationTrialDate)}${
                    getters.TARIFF.timezone
                }`
            );
        }

        if (getters.IS_TARIFF_STANDART) {
            return new Date(
                `${normalizeTimestamp(getters.TARIFF.expirationDate)}${getters.TARIFF.timezone}`
            );
        }

        return null;
    },
};

export default { init, state, mutations, actions, getters };
