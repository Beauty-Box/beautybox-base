import { Clients } from '../../entity/Clients';

export const clients = {
    data: () => ({
        clients: {},
        readyToGetElements: false,
        loadPage: false,
        loadData: true,
    }),
    computed: {
        allItemsLength() {
            return this.clients.count;
        },
        nowItemsLength() {
            return this.clients.clients.length;
        },
    },
    methods: {
        testClientsCount() {
            if (this.clients.clients.length < this.clients.count) {
                this.readyToGetElements = true;
            }
        },
        async search(query = this.$route.query) {
            if (this.clients.clients.length) {
                this.loadData = true;
            }
            this.readyToGetElements = false;
            try {
                await this.clients.searchClients(query);
                if (!this.clients.clients.length) {
                    this.notFound = true;
                } else {
                    this.notFound = false;
                    this.testClientsCount();
                }
            } catch (e) {
                this.messageError('Произошла ошибка при загрузке данных');
            } finally {
                this.loadData = false;
            }
        },
        async addClients(query = this.$route.query, count = this.clients.clients.length) {
            this.loadPage = true;

            try {
                await this.clients.getClients(query, count);
                this.testClientsCount();
            } catch (e) {
                this.messageError('Произошла ошибка при загрузке данных');
            } finally {
                this.loadPage = false;
            }
        },
    },
    created() {
        this.clients = new Clients();
    },
};
