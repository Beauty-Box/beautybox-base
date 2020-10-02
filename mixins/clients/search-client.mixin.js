import { required } from 'vuelidate/lib/validators';
import { Clients } from '@beautybox/entity/Clients';
import { scroll } from '@beautybox/core/mixins/ScrollControl';
import { clients } from '@beautybox/core/mixins/clients/clients-list.mixin';

export const searchClient = {
    mixins: [scroll, clients],
    inject: ['$v'],
    data: () => ({
        searchClient: '',
        searchClientIsActive: false,
        dialogAddClient: false,
        client: {
            clientID: 0,
        },
    }),
    computed: {
        clientErrors() {
            let errors = [];

            if (!this.$v.bids.$each[0].clientID.$dirty) {
                return errors;
            }

            if (!this.$v.bids.$each[0].clientID.minValue) {
                errors.push('Выберите клиента');
            }
            console.log('errors', errors);
            return errors;
        },
        queryClient() {
            return this.searchClient ? { nameFilter: this.searchClient } : {};
        },
    },
    methods: {
        searchClientOnFocus() {
            this.searchClientIsActive = true;
            this.search(this.queryClient);
        },
        setClient(client) {
            this.$emit('change', client.clientID);
        },
        onScrollEndHandler() {
            this.addClients(this.queryClient, this.clients.clients.length);
        },
    },
    created() {
        this.clients = new Clients();
    },
};
