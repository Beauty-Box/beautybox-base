import Api from '../../api';

class Payroll {
    constructor(params) {
        if (!params.token) {
            throw 'Не удается получить токен из входных параметров';
        } else {
            this.token = params.token;
        }
        if (!params.baseUrl) {
            throw 'Не удается получить baseUrl из входных параметров';
        } else {
            this.baseUrl = params.baseUrl;
        }
        if (!params.id) {
            throw 'Не удается получить id салона из входных параметров';
        } else {
            this.id = params.id;
        }
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
        if (typeof params === 'undefined') {
            throw 'Не переданы входные параметры для создания экземпляра';
        }
        if (!params.token) {
            throw 'Не удается получить токен из входных параметров';
        } else {
            this.token = params.token;
        }
        if (!params.baseUrl) {
            throw 'Не удается получить baseUrl из входных параметров';
        } else {
            this.baseUrl = params.baseUrl;
        }
        this._provaider = new Api(this.baseUrl, 'crm', this.token);

        this.errors = {};
        this.total = 0;
        this.payrollRules = [];
    }

    async getRules() {
        ({
            errors: this.errors = {},
            total: this.total = 0,
            payrollRules: this.payrollRules = [],
        } = await this._provaider.get('/payroll-rules'));

        if (Object.keys(this.errors).length) {
            throw 'Произошла ошибка при получении списка рассчета зарплат';
        }
    }
}

export { Payroll, PayrollRules };
export default Payroll;
