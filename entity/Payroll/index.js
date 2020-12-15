import { Api } from '../../api';
import { isNumber } from '../../helpers/isNumber';
function testInputData(params) {
    if (typeof params === 'undefined') {
        throw 'Не переданы входные параметры для создания экземпляра';
    } else if (toString.call(params).slice(8, -1) !== 'Object') {
        throw 'Параметры конструкторы должны быть объектом вида { baseUrl: "http://baseUrl", token: "cmAD3cae3Fafvcae.vfaeFcEEECA3.FEAfaAdawd" }';
    }
    if (!params.token) {
        throw 'Не удается получить токен из входных параметров';
    }
    if (!params.baseUrl) {
        throw 'Не удается получить baseUrl из входных параметров';
    }
}
let _provider = null;

class PayrollRule {
    constructor() {
        this.name = '';
        this.value = 0;
        this.salary = 0;
        this.addressID = 0;
        this.baseSalary = 0;
        this.value_type = 0;
        this.periodicity_type = 0;
        this.base_periodicity_type = 0;
        this.categories = [];
    }

    addCategory() {
        const category = {
            categoryID: 0,
            serviceID: 0,
            value: this.value,
            value_type: this.value_type,
        };
        console.log('category', category);
        this.categories.push(category);
    }

    setValue(value) {
        if (!isNumber(value)) {
            throw 'Значение не является числом';
        }
        if (this.value_type === 0) {
            if (value < 0) {
                this.salary = 0;
            } else if (value < 1000000000) {
                this.salary = value;
            } else {
                this.salary = 1000000000;
            }
        } else {
            if (value < 0) {
                this.salary = 0;
            } else if (value <= 100) {
                this.salary = value;
            } else {
                this.salary = 100;
            }
        }
    }

    static createProvider(config = {}) {
        _provider = new Api(config.baseUrl || process.env.BASE_URL, 'crm', config.token || null);
    }
    static async store(payrollRule) {
        const { errors = {} } = await _provider.post('/payroll-rules', { ...payrollRule });
        console.log('errors', errors);
    }
    static async update(id, rule) {
        const { errors = {}, ...res } = await _provider.put(`/payroll-rules/${id}`, rule);
        return { errors, ...res };
    }
    static async show(id) {
        const { errors = {}, ...res } = await _provider.get(`/payroll-rules/${id}`);
        return { errors, ...res };
    }
    static async delete(id) {
        const { errors = {} } = await _provider.delete(`/payroll-rules/${id}`);
        return { errors };
    }
    static async create() {}
}

class PayrollRules {
    constructor(params) {
        // testInputData(params);
        this._errors = {};
        this._total = 0;
        this._items = [];
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

    set total(value) {
        if (!Number.isInteger(value)) {
            throw 'total должен быть целым числом';
        } else {
            this._total = value;
        }
    }
    get total() {
        return this._total;
    }

    static createProvider(config = {}) {
        _provider = new Api(config.baseUrl || process.env.BASE_URL, 'crm', config.token || null);
    }

    /** Публичне методы работы с экземпляром класса */
    static async getRules() {
        const { errors = {}, total = 0, payrollRules = [] } = await _provider.get('/payroll-rules');
        return { errors, total, payrollRules };
    }

    static async addRules(payrollRulesLength = 0) {
        const { errors = {}, total = 0, payrollRules = [] } = await _provider.get(
            `/payroll-rules?skip=${payrollRulesLength}`
        );
        return { errors, total, payrollRules };
    }
    /** Служебные методы работы с экземпляром класса */
    pushInPayrollRules(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this._items.push(...value);
        }
    }
}

export { PayrollRule, PayrollRules };
export default { PayrollRule, PayrollRules };
