import { Provider } from '../Provider';

export class Orders extends Provider {
    constructor() {
        super('crm');
    }

    // analyze(queryString = '') {
    //     return this._provider.get(`/analytics/analyze${queryString}`);
    // }

    orders(queryString = '') {
        return this._provider.get(`/market${queryString}`);
    }

    order(id) {
        return this._provider.get(`/market/order/${id}`);
    }

    products(queryString = '', skip = 0) {
        return this._provider.get(`/market/products${queryString}skip=${skip}`);
    }

    categories() {
        return this._provider.get('/market/categories');
    }

    addToCart(formData) {
        this._provider.post('/market/products/cart', formData);
    }

    removeFromCart(formData) {
        this._provider.post('/market/products/cart-remove', formData);
    }

    itemsInCart() {
        return this._provider.get('/market/products/cart');
    }
}
