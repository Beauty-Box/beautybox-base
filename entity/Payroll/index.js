import { ProviderClass } from '../../api';
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

class PayrollRule extends ProviderClass {
    constructor() {
        super();
        this.name = '';
        this.value = 0;
        this.salary = 0;
        this.addressID = 0;
        this.baseSalary = 0;
        this.valueType = 0;
        this.periodicityType = 0;
        this.basePeriodicityType = 0;
        this.categories = [];
    }

    addCategory(copy = true) {
        const category = {
            categoryID: null,
            serviceID: null,
            value: copy ? this.value : 0,
            valueType: copy ? this.valueType : 0,
        };
        this.categories.push(category);
    }

    removeCategory(index) {
        testInteger(index);
        if (index < 0) {
            throw 'Индекс не может быть отрицательным';
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
    static async store(payrollRule) {
        const newPayrollRule = { ...payrollRule };
        newPayrollRule.categories = newPayrollRule.categories.filter((item) => !!item.categoryID);
        const { errors = {} } = await PayrollRule._provider.post('/payroll-rules', newPayrollRule);
        return { errors };
    }
    static async update(id, payrollRule) {
        const newPayrollRule = { ...payrollRule };
        newPayrollRule.categories = newPayrollRule.categories.filter((item) => !!item.categoryID);
        const { errors = {}, ...res } = await PayrollRule._provider.put(
            `/payroll-rules/${id}`,
            newPayrollRule
        );
        return { errors, ...res };
    }
    static async show(id) {
        const { errors = {}, ...res } = await PayrollRule._provider.get(`/payroll-rules/${id}`);
        return { errors, ...res };
    }
    static async delete(id) {
        const { errors = {} } = await PayrollRule._provider.delete(`/payroll-rules/${id}`);
        return { errors };
    }
}

class PayrollRules extends ProviderClass {
    constructor() {
        super();
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

    /** Публичне методы работы с экземпляром класса */
    static async getRules() {
        const {
            errors = {},
            total = 0,
            payrollRules = [],
        } = await PayrollRules._provider.get('/payroll-rules');
        testInteger(total);
        testArray(payrollRules);
        return { errors, total, payrollRules };
    }

    static async addRules(payrollRulesLength = 0) {
        const {
            errors = {},
            total = 0,
            payrollRules = [],
        } = await PayrollRules._provider.get(`/payroll-rules?skip=${payrollRulesLength}`);
        testInteger(total);
        testArray(payrollRules);
        return { errors, total, payrollRules };
    }
}

export { PayrollRule, PayrollRules };
export default { PayrollRule, PayrollRules };
