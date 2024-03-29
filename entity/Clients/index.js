import { Person } from '../Person';
import { Provider } from '../Provider';
import { joinQueryArray } from '../../helpers';

export class Client extends Person {
    constructor(id) {
        super({
            BASE_URL: import.meta.env.VITE_BASE_URL,
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
        this.clientTypes = [];
        this.blockingOnline = 0;
        this.notificationsDisabled = 0;
    }

    _initFormData(formData) {
        super._initFormData(formData);
        if (!!this.clientTypes.length) {
            for (const clientType of this.clientTypes) {
                formData.append('clientTypes[]', clientType);
            }
        } else {
            formData.append('clientTypes[]', '');
        }

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

    clientAvatarStatus() {
        if (!!this.blockingOnline) {
            return { text: 'Заблокирован', icon: 'clients--blocked', fill: '#FF2D55' };
        }
        if (!!this.notificationsDisabled) {
            return {
                text: 'Уведомления отключены',
                icon: 'notifications-off',
                fill: '#FF2D55',
            };
        }
        if (this.birthday) {
            const birthDay = new Date(this.birthday);
            const today = new Date();
            const isBirthdayToday =
                birthDay.getMonth() === today.getMonth() && birthDay.getDate() === today.getDate();
            if (isBirthdayToday) {
                return { text: 'День рождения', icon: 'birthday', fill: '#BF5AF2' };
            }
        }
        return { text: '', icon: '', fill: '' };
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
        res.clientTypes = res.clientTypes.map((clientType) => clientType.clientTypeID);
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
            BASE_URL: import.meta.env.VITE_BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
        this.sortOrder = false;
        this.sortBy = '';
        this.clients = [];
        this.count = 0;
        this.clientsIDs = [];
    }

    async _getClients(args) {
        const { clients = [], count = 0 } = await this._provider.get(
            `/v2/clients?${this._getQuery(args)}`
        );
        return { clients, count };
    }

    _getQuery(args) {
        let query = joinQueryArray({ skip: args[1], limit: args[2], ...args[0] });
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

    static clientAvatarStatus(item) {
        return Client.prototype.clientAvatarStatus.apply(item);
    }

    async getClients({ ...clientParams } = {}, skip = 0, limit = 15) {
        const { clients = [], count = 0 } = await this._getClients([
            { ...clientParams },
            skip,
            limit,
        ]);
        this.clients = [...this.clients, ...clients];
        this.count = count || this.clients.length;

        return clients;
    }

    async searchClients({ ...clientParams } = {}, skip = 0, limit = 15) {
        const { clients = [], count = 0 } = await this._getClients([
            { ...clientParams },
            skip,
            limit,
        ]);
        this.clients = [...clients];
        this.count = count || this.clients.length;
    }

    async getClientsIDs({ ...clientParams } = {}) {
        let clientsIDs = [];
        let response = null;
        try {
            response = await this._provider.get(`/clients/ids?${this._getQuery([clientParams])}`);
        } catch (error) {
            console.log('clientsIDs failed', error);
            throw new Error('Не удалось получить всех клиентов');
        }

        if (response.errors && Object.keys(response.errors).length) {
            console.log('clientsIDs failed validation', response.errors);
            throw new Error('Не удалось получить всех клиентов');
        }

        ({
            body: { ids: clientsIDs = [] },
        } = response);

        this.clientsIDs = [...clientsIDs];
    }
}
