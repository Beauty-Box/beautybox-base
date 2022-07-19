import { Person } from '../Person';
import { Provider } from '../Provider';

export class Client extends Person {
    constructor(id) {
        super({
            BASE_URL: process.env.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
        if (id) {
            this.clientID = parseInt(id);
        }

        this.bids = {
            count: 0,
            past: [],
            coming: [],
        };
        this.categories = [];
        this.totalVisits = {};
        this.profit = 0;
        this.clientTypeID = 0;
        this.blockingOnline = 0;
    }

    _initFormData(formData) {
        super._initFormData(formData);
        formData.append('clientTypeID', this.clientTypeID);
        formData.append('blockingOnline', this.blockingOnline);
        formData.append('sale', this.sale);
    }

    setFirstCategory(categories = this.categories) {
        if (!Boolean(this.clientTypeID) && categories.length) {
            this.clientTypeID = categories[0].value;
        }
    }

    get averageCheck() {
        if (this.totalVisits.all && this.profit) {
            return Math.floor(this.profit / this.totalVisits.done);
        } else {
            return 0;
        }
    }

    get uploadedBids() {
        return this.bids.past.length + this.bids.coming.length;
    }

    async init(params = {}) {
        let res = await this._provider.get('/clients/create');
        res = { ...res, ...params };
        this._resConvert(res);
    }

    async show() {
        let res = await this._provider.get(`/clients/${this.clientID}`);
        this._resConvert(res);
    }

    async edit() {
        let res = await this._provider.get(`/clients/${this.clientID}/edit`);
        this._resConvert(res);
    }

    async update() {
        let formData = new FormData();
        formData.append('_method', 'put');
        formData.append('clientID', `${this.clientID}`);
        this._initFormData(formData);
        ({ errors: this.errors = {} } = await this._provider.post(
            `/clients/${this.clientID}`,
            formData
        ));
    }

    async create() {
        let formData = new FormData();
        this._initFormData(formData);
        let { location, errors = {} } = await this._provider.post('/clients', formData);
        if (Object.keys(errors).length) {
            this.errors = errors;
            console.log(this);
            return;
        }
        this.clientID = parseInt(location.split('/')[2]);
    }

    async createAll(clients) {
        await this._provider.put('/clients/store-all', { clients });
    }

    async delete() {
        if (this.clientID) {
            await this._provider.delete(`/clients/${this.clientID}`);
        } else {
            throw 'Нельзя удалить не созданого клиента';
        }
    }

    async getBids() {
        let res = await this._provider.get(
            `/clients/${this.clientID}/visits?skip=${this.uploadedBids}`
        );
        this.bids.count = res.count;
        this.bids.past = [...this.bids.past, ...res.past];
        this.bids.coming = [...this.bids.coming, ...res.coming];
    }

    async getCategories() {
        ({ categories: this.categories = [] } = await this._provider.get(
            '/clients/category/short'
        ));
    }

    async getAnalytics() {
        ({ totalVisits: this.totalVisits, profit: this.profit } = await this._provider.get(
            `/clients/${this.clientID}/analytics`
        ));
    }
}

export class Clients extends Provider {
    constructor() {
        super({
            BASE_URL: process.env.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
        this.sortOrder = false;
        this.sortBy = '';
        this.clients = [];
        this.count = 0;
    }

    async _getClients(args) {
        const { clients = [], count = 0 } = await this._provider.get(
            `/clients?${this._getQuery(args)}`
        );
        return { clients, count };
    }

    _getQuery(args) {
        let query = `skip=${args[1]}&limit=${args[2]}`;

        for (let key in args[0]) {
            query += `${args[0][key] ? `&${key}=${args[0][key]}` : ''}`;
        }
        query += `${
            this.sortBy ? `&sortBy=${this.sortBy}&sortOrder=${this.sortOrder ? 'desc' : 'asc'}` : ''
        }`;
        return query;
    }

    get clientsList() {
        return this.clients;
    }

    get clientsCount() {
        return this.count;
    }

    async getFilters() {
        ({ categories: this.types = [] } = await this._provider.get('/clients/category/short'));
    }

    async getClients(
        { nameFilter = '', clientsTypeFilter = 0, ...clientParams } = {},
        skip = 0,
        limit = 15
    ) {
        const { clients = [], count = 0 } = await this._getClients([
            { nameFilter, clientsTypeFilter, ...clientParams },
            skip,
            limit,
        ]);
        this.clients = [...this.clients, ...clients];
        this.count = count || this.clients.length;
    }

    async searchClients(
        { nameFilter = '', clientsTypeFilter = 0, ...clientParams } = {},
        skip = 0,
        limit = 15
    ) {
        const { clients = [], count = 0 } = await this._getClients([
            { nameFilter, clientsTypeFilter, ...clientParams },
            skip,
            limit,
        ]);
        this.clients = [...clients];
        this.count = count || this.clients.length;
    }
}
