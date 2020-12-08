import Api from '../../api';
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

class Payroll {
    constructor(params) {
        testInputData(params);
        this.baseUrl = params.baseUrl;
        this.token = params.token;
        this.name = '';
        this.value = 0;
        this.salary = 0;
        this.addressID = 0;
        this.baseSalary = 0;
        this.value_type = 1;
        this.periodicity_type = 1;
        this.categories = [
            {
                categoryID: 63907,
                serviceID: 89418,
                value: 40,
                value_type: 1,
            },
        ];
    }

    store() {}
    update() {}
    show() {}
    delete() {}
    create() {}
}

class PayrollRules {
    constructor(params) {
        testInputData(params);
        this.baseUrl = params.baseUrl;
        this.token = params.token;
        this._provaider = new Api(this.baseUrl, 'crm', this.token);
        this.errors = {};
        this.total = 0;
        this.payrollRules = [];
    }

    /** сеттер для добавления новых прав в существующий массив payrollRules */
    set _pushInPayrollRules(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this.payrollRules.push(...value);
        }
    }
    /** сеттер для добавления присваивания нового массива в payrollRules */
    set _setPayrollRules(value) {
        if (!Array.isArray(value)) {
            throw 'Устанавливаемое значение не явъяется массивом';
        } else {
            this.payrollRules = [...value];
        }
    }
    /** сеттер для присваения нового значения total */
    set _setTotal(value) {
        if (!Number.isInteger(value)) {
            throw 'total должен быть целым числом';
        } else {
            this.total = value;
        }
    }

    /** Публичне методы работы с экземпляром класса */
    async getRules() {
        ({
            errors: this.errors = {},
            /** тут используется сеттер, чтобы не писать много проверок в одной функции */
            total: this._setTotal = 0,
            payrollRules: this._setPayrollRules = [],
        } = await this._provaider.get('/payroll-rules'));

        this._testOnError();
    }

    async addRules() {
        if (this.payrollRules.length < this.total) {
            ({
                errors: this.errors = {},
                /** тут используется сеттер, чтобы не писать много проверок в одной функции */
                total: this._setTotal = 0,
                payrollRules: this._pushInPayrollRules = [],
            } = await this._provaider.get(`/payroll-rules?skip=${this.payrollRules.length}`));

            this._testOnError();
        }
    }
    /** Служебные методы работы с экземпляром класса */

    _testOnError() {
        if (Object.keys(this.errors).length) {
            if (this.errors.messages) {
                throw this.errors.messages;
            } else {
                throw 'Произошла ошибка при получении списка рассчета зарплат';
            }
        }
    }
}

export { Payroll, PayrollRules };
export default Payroll;
