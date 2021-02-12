import { ProviderClass } from '../../../api';

class Orders extends ProviderClass {
    constructor() {
        super();
        this._errors = {};
        this._count = 0;
        this._items = [];
        this._status = [
            {
                filterText: 'Все',
                text: 'Все заказы',
                value: 0,
            },
        ];
    }

    set errors(value) {
        this._errors = value;
        if (Object.keys(this._errors).length) {
            if (this._errors.messages) {
                throw this._errors.messages;
            } else {
                throw 'Произошла ошибка при получении списка рассчета зарплат';
            }
        }
    }

    set items(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this._items = [...value];
        }
    }

    get items() {
        return this._items;
    }

    set status(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this._status = [...this._status, ...value];
        }
    }

    get status() {
        return this._status;
    }

    /** Получение списка покупок */
    static async getOrders(queryString = '') {
        const { errors = {}, count = 0, orders = [] } = await Orders._provider.get(
            `/orders${queryString}`
        );
        return { errors, count, orders };
    }

    /** Добавление к списку покупок при скроле */
    static async getOrdersOnScroll(ordersLength = 0) {
        const { errors = {}, orders = [] } = await Orders._provider.get(
            `/orders?skip=${ordersLength}`
        );
        return { errors, orders };
    }

    /** Получение списка статусов заказа */
    static async getOrderStatuses() {
        const { errors = {}, status = [] } = await Orders._provider.get('/status/short');
        return { errors, status };
    }
}

class Order extends ProviderClass {
    constructor() {
        super();
        this.address = '';
        this.date = '';
        this.deliveryPrice = 0;
        this.deliveryType = '';
        this.orderID = 0;
        this.price = 0;
        this.products = [];
        this.sale = 0;
        this.status = {};
        this.stock = '';
        this.total = 0;
        this.trackNumber = '';
    }

    static async show(id) {
        const { errors = {}, ...res } = await Order._provider.get(`/orders/${id}`);
        return { errors, ...res };
    }
}

export { Orders, Order };
export default { Orders, Order };
