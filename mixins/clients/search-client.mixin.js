import { required } from 'vuelidate/lib/validators';
import { Clients } from '../../entity/Clients';
import { scrollControl } from '../ScrollControl';
import { clients } from '../clients/clients-list.mixin';

export const searchClient = {
    mixins: [scrollControl, clients],
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
