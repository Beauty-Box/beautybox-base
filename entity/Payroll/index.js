import { Api } from '../../api';
// import { isNumber } from '../../helpers/isNumber';
function testInteger(value) {
    if (!Number.isInteger(value)) {
        throw 'Значение не является целым числом';
    }
}
function testArray(value) {
    if (!Array.isArray(value)) {
        throw 'Значение не является массивом';
    }
}

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
            categoryID: null,
            serviceID: null,
            value: this.value,
            value_type: this.value_type,
        };
        console.log('category', category);
        this.categories.push(category);
    }

    removeCategory(index) {
        testInteger(index);
        if (index < 0) {
            throw 'Индекс меньше допустимого значения';
        } else if (index >= this.categories.length) {
            throw 'Индекс больше допустимого значения';
        } else {
            this.categories.splice(index, 1);
        }
    }

    // setValue(value) {
    //     if (!isNumber(value)) {
    //         throw 'Значение не является числом';
    //     }
    //     if (this.value_type === 0) {
    //         if (value < 0) {
    //             this.salary = 0;
    //         } else if (value < 1000000000) {
    //             this.salary = value;
    //         } else {
    //             this.salary = 1000000000;
    //         }
    //     } else {
    //         if (value < 0) {
    //             this.salary = 0;
    //         } else if (value <= 100) {
    //             this.salary = value;
    //         } else {
    //             this.salary = 100;
    //         }
    //     }
    // }

    static createProvider(config = {}) {
        _provider = new Api(config.baseUrl || process.env.BASE_URL, 'crm', config.token || null);
    }
    static async store(payrollRule) {
        const newPayrollRule = { ...payrollRule };
        newPayrollRule.categories = newPayrollRule.categories.filter((item) => !!item.categoryID)
        const { errors = {} } = await _provider.post('/payroll-rules', newPayrollRule);
        console.log('errors', errors);
    }
    static async update(id, payrollRule) {
        const newPayrollRule = { ...payrollRule };
        newPayrollRule.categories = newPayrollRule.categories.filter((item) => !!item.categoryID)
        const { errors = {}, ...res } = await _provider.put(`/payroll-rules/${id}`, newPayrollRule);
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

    static createProvider(config = {}) {
        _provider = new Api(config.baseUrl || process.env.BASE_URL, 'crm', config.token || null);
    }

    /** Публичне методы работы с экземпляром класса */
    static async getRules() {
        const { errors = {}, total = 0, payrollRules = [] } = await _provider.get('/payroll-rules');
        testInteger(total);
        testArray(payrollRules);
        return { errors, total, payrollRules };
    }

    static async addRules(payrollRulesLength = 0) {
        const { errors = {}, total = 0, payrollRules = [] } = await _provider.get(
            `/payroll-rules?skip=${payrollRulesLength}`
        );
        testInteger(total);
        testArray(payrollRules);
        return { errors, total, payrollRules };
    }
}

export { PayrollRule, PayrollRules };
export default { PayrollRule, PayrollRules };
