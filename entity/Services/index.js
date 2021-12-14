import { Provider } from '../Provider';

export class Categories extends Provider {
    constructor() {
        super({
            BASE_URL: process.env.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });

        this.categories = [];
        this.categoriesShort = [];
        this.categoriesRecommended = [];
        this.categoriesColors = [];
    }

    /**
     * getCategories Метод для получения категорий
     * @param {Number} addressID
     * @return {Array} categories массив категорий
     * */
    async getCategories(addressID) {
        ({ categories: this.categories = [] } = await this._provider.get(
            `/categories?addressID=${addressID}`
        ));
        return this.categories;
    }

    /**
     * getCategoriesShort Метод для получения сокращенных категорий
     * @param {Number} addressID
     * @return {Array} categories массив категорий
     * */
    async getCategoriesShort(addressID) {
        ({ categories: this.categoriesShort = [] } = await this._provider.get(
            `/categories-short?addressID=${addressID}`
        ));
        return this.categoriesShort;
    }

    /**
     * getRecommendedCategories Метод для получения рекомендуемых категорий
     * @param {Number} addressID
     * @return {Array} recommendedCategories массив рекомендуемых категорий
     * */
    async getRecommendedCategories(addressID) {
        ({ recommendedCategories: this.categoriesRecommended = [] } = await this._provider.get(
            `/categories/recommended?addressID=${addressID}`
        ));
        return this.categoriesRecommended;
    }

    /**
     * saveCategories Метод для сохранения  пользовательских категорий
     * @param {Array} data объект новой категории
     * */
    async saveCategories(data) {
        return await this._provider.post('/categories', data);
    }

    /**
     * getCategoryInfo Метод для получения услуги
     * @param {Number, String} categoryID
     * @return {Object}
     * */
    async getCategoryInfo(categoryID) {
        return await this._provider.get(`/categories/${categoryID}`);
    }

    /**
     * updateCategory Метод для обновления категории
     * @param {Number} categoryID
     * @param {Object} data объект категории
     * */
    async updateCategory(categoryID, data) {
        const { errors = {} } = await this._provider.put(`/categories/${categoryID}`, data);
        if (Object.keys(errors).length) {
            return errors.message;
        }
        console.log('--- updateCategory', errors);
    }

    /**
     * deleteCategory Метод для удаления категории
     * @param {Number} categoryID ID категории
     * */
    async deleteCategory(categoryID) {
        await this._provider.delete(`/categories/${categoryID}`);
    }

    /**
     * saveNewCustomCategory Метод для сохранения  пользовательской категории
     * @param {Object} data объект новой категории
     * */
    async saveNewCustomCategory(data) {
        return await this._provider.post('/categories', data);
    }
}

export class Services extends Provider {
    constructor() {
        super({
            BASE_URL: process.env.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });
    }

    /**
     * getCategories Метод для получения услуг
     * @param {Number} categoryID
     * @return {Array} services массив услуг
     * */
    async getServices(categoryID) {
        const { services = [] } = await this._provider.get(`/services?categoryID=${categoryID}`);
        return services;
    }

    /**
     * saveServices Метод для сохранения пользовательских услуг
     * @param {Array} data Массив услуг
     * */
    async saveServices(data) {
        await this._provider.post('/services', data);
    }
}

export class Service extends Provider {
    constructor(id) {
        super({
            BASE_URL: process.env.BASE_URL,
            module: 'crm',
            token: localStorage.getItem('access_token'),
        });

        this.serviceID = id || '';
        this.title = '';
        this.customerTitle = '';
        this.price = '';
        this.isOnline = false;
        this.status = false;
    }

    _merge(res) {
        console.log('SERVICE MERGE BEFORE', res);
        if (res.error) {
            return;
        }
        Object.assign(this, res);
        console.log('SERVICE MERGE THIS AFTER', this);
    }

    get info() {
        return {
            customerTitle: this.customerTitle,
            isOnline: this.isOnline,
            price: this.price,
            serviceID: this.serviceID,
            status: this.status,
            time: this.time,
            title: this.title,
        };
    }

    /**
     * getInfo Метод для получинея информации об услуге
     * */
    async getInfo() {
        const response = await this._provider.get(`/services/${this.serviceID}/info`);
        console.log('--- getInfo', response);
        this._merge(response);
        return this;
    }

    async edit() {
        const response = await this._provider.get(`/services/${this.serviceID}/edit`);
        this._merge(response);
    }

    /**
     * update Метод для обновления услуги
     * @param {Number} serviceID id услуги
     * @param {Object} data Объект услуги
     * */
    async update(serviceID, data) {
        let { location = '' } = await this._provider.post(`/services/${serviceID}`, data);
        if (location.length) {
            this.serviceID = location.split('/')[2];
        }
    }

    /**
     * delete Метод для удаления услуги
     * @param {Number} serviceID id услуги
     * */
    async delete(serviceID) {
        await this._provider.delete(`/services/${serviceID}`);
    }
}
