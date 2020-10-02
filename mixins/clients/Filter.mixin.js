import { mapGetters, mapMutations } from 'vuex';
const BFilterSelectClientsCategory = () =>
    import(
        /* webpackChunkName: "BFilterSelectClientsCategory" */ '@beautybox/ui-kit/components/filters/selects/SelectClientsCategory'
    );

export const ClientsFilterMixin = {
    components: { BFilterSelectClientsCategory },
    computed: {
        ...mapGetters([
            'CLIENTS_CATEGORIES',
            'SELECT_CLIENTS_CATEGORY',
            'CHECK_PERMISSION',
            'NAME_FILTER',
        ]),
    },
    methods: {
        ...mapMutations(['SET_CLIENTS_CATEGORIES', 'SET_NAME_FILTER']),
    },
};
