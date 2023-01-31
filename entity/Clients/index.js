import { Person } from '../Person';
import { Provider } from '../Provider';
import { joinQueryArray } from '../../helpers';

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
        // visits V2
        this.visits = {
            past: {
                count: 0,
                visits: [],
            },
            coming: {
                count: 0,
                visits: [],
            },
        };
        this.products = {
            count: 0,
            products: [],
        };
        this.sales = {
            count: 0,
            sales: [],
        };
        this.categories = [];
        this.totalVisits = {};
        this.profit = 0;
        this.reviews = {};
        this.clientTypeID = 0;
        this.blockingOnline = 0;
        this.notificationsDisabled = 0;
    }

    _initFormData(formData) {
        super._initFormData(formData);
        formData.append('clientTypeID', this.clientTypeID);
        formData.append('blockingOnline', this.blockingOnline);
        formData.append('notificationsDisabled', this.notificationsDisabled);
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

    get uploadedProducts() {
        return this.products.products.length;
    }

    get uploadedSales() {
        return this.sales.sales.length;
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

    async updateFields(client) {
        let formData = new FormData();
        formData.append('_method', 'put');
        Object.keys(client).forEach((key) => {
            formData.append(key, client[key]);
        });
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

    async getVisitsV2(type) {
        let res = await this._provider.get(
            `/clients/${this.clientID}/visitsV2?type=${type}&skip=${this.visits[type].visits.length}`
        );
        this.visits[type].count = res.count;
        this.visits[type].visits = [...this.visits[type].visits, ...res.visits];
    }

    async getProducts() {
        const res = await this._provider.get(
            `/clients/${this.clientID}/products?skip=${this.uploadedProducts}`
        );
        this.products.count = res.count;
        this.products.products = [...this.products.products, ...res.products];
    }

    async getSales() {
        const res = await this._provider.get(
            `/sales?clientID=${this.clientID}&skip=${this.uploadedSales}`
        );
        this.sales.count = res.count;
        this.sales.sales = [...this.sales.sales, ...res.sales];
    }

    async getCategories() {
        ({ categories: this.categories = [] } = await this._provider.get(
            '/clients/category/short'
        ));
    }

    async getAnalytics() {
        ({
            totalVisits: this.totalVisits,
            profit: this.profit,
            reviews: this.reviews,
        } = await this._provider.get(`/clients/${this.clientID}/analytics`));
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
        const {
            clients = [],
            count = 0,
            clientsIDs = [],
        } = await this._provider.get(`/clients?${this._getQuery(args)}`);
        return { clients, count, clientsIDs };
    }

    _getQuery(args) {
        let query = `skip=${args[1]}&limit=${args[2]}`;

        query += '&' + joinQueryArray(args[0]);
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
        const {
            clients = [],
            count = 0,
            clientsIDs = [],
        } = await this._getClients([
            { nameFilter, clientsTypeFilter, ...clientParams },
            skip,
            limit,
        ]);
        this.clients = [...clients];
        this.count = count || this.clients.length;
        this.clientsIDs = [...clientsIDs];
    }
}
