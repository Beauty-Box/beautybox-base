import { mapGetters } from 'vuex';

export const userMixin = {
    computed: {
        ...mapGetters(['USER_INFO']),
    },
};
