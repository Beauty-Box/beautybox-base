import { mapGetters } from 'vuex';

export const errorMixin = {
    computed: {
        ...mapGetters(['ERROR']),
    },
};
