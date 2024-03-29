import { ProviderClass } from '../../../api';

class Products extends ProviderClass {
    constructor() {
        super();
        this._items = [];
        this._categories = [
            {
                value: 0,
                text: 'Все категории',
            },
        ];
    }

    get categories() {
        return this._categories;
    }

    set categories(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this._categories = [...this._categories, ...value];
        }
    }

    static async getCategories() {
        const { errors = {}, categories = [] } = await Products._provider.get('/categories');
        return { errors, categories };
    }

    get items() {
        return this._items;
    }

    set items(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this._items = value;
        }
    }

    set addItems(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this._items = [...this._items, ...value];
        }
    }

    /**
     * @description getProducts Получение массива продуктов
     * @param {String} queryString строка query запроса
     * */
    static async getProducts(queryString = '') {
        const {
            errors = {},
            products = [],
            total = 0,
        } = await Products._provider.get(`/products${queryString}`);
        return { errors, products, total };
    }

    /**
     * @description getCartItems Получение массива товаров в корзине
     * */
    static async getCartItems() {
        return await Products._provider.get('/products/cart');
    }

    /**
     * @description getFavoritesProducts Получение массива избранных товаров
     * */
    static async getFavoritesProducts(queryString = '') {
        const {
            errors = {},
            favorites = [],
            total = 0,
        } = await Products._provider.get(`/favorites${queryString}`);
        return { errors, favorites, total };
    }

    /**
     * @description getFavoritesProductsId Метод для получение количества избранных товаров
     * */
    static async getFavoriteProductsCount() {
        const { count = 0 } = await Products._provider.get('/favorites?count=true');
        return { count };
    }

    /**
     * @description getFavoritesProductsId Получение массива ID избранных товаров
     * */
    static async getFavoritesProductsId() {
        return await Products._provider.get('/favorites/list');
    }

    /** Метод для получение количества закзов */
    static async getMyOrders() {
        const { expect = false, count = 0 } = await Products._provider.get('/orders/expected');
        return { expect, count };
    }

    /** Метод для получение купленых товаров */
    static async getBoughtProducts() {
        const { count = 0 } = await Products._provider.get('/products?count=true');
        return { count };
    }
}

class Product extends ProviderClass {
    static async addToCart(formData) {
        await Product._provider.post('/products/cart', formData);
    }

    static async removeFromCart(formData) {
        await Product._provider.post('/products/cart-remove', formData);
    }

    static async addToFavorites(productID) {
        await Product._provider.post(`/favorites?productID=${productID}`);
    }

    static async removeFromFavorites(productID) {
        await Product._provider.delete(`/favorites?productID=${productID}`);
    }
}

export { Products, Product };
export default { Products, Product };
