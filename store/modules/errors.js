export const state = () => ({
    error: false,
    type: '',
});

export const mutations = {
    SET_ERROR(state, payload) {
        state.error = true;
        state.type = payload;
    },
    CLEAR_ERROR(state) {
        state.error = false;
        state.type = '';
    },
};

export const actions = {
    SERVER_ERROR({ commit }) {
        commit('SET_ERROR', 'server-error');
    },
    BAD_REQUEST({ commit }) {
        commit('SET_ERROR', 'bad-request');
    },
    FORBIDDEN({ commit }) {
        commit('SET_ERROR', 'forbidden');
    },
    NOT_FOUND({ commit }) {
        commit('SET_ERROR', 'not-found');
    },
    UNKNOWN_ERROR({ commit }) {
        commit('SET_ERROR', 'unknown-error');
    },
    CLEAR_ERROR({ commit }) {
        commit('CLEAR_ERROR');
    },
};

export const getters = {
    ERROR: (state) => state.error,
    TYPE: (state) => state.type,
};

export default { state, mutations, actions, getters };
