/**
 * Миксин содержит инициализацию клиента валидацию для полей клиента
 * */
import { Client } from '../../entity/Clients';

import { maxLength, minLength, required } from 'vuelidate/lib/validators';

export const clientAction = {
    data: () => ({
        client: {
            errors: {},
        },
    }),
    computed: {
        nameErrors() {
            let errors = [];
            if (!this.$v.client.name.$dirty) {
                return errors;
            }

            if (!this.$v.client.name.maxLength) {
                errors.push('Имя может содержать не более 75 символов');
            }

            if (!this.$v.client.name.required) {
                errors.push('Введите имя клиента');
            }

            return errors;
        },
        clientTypeIDErrors() {
            let errors = [];

            if (!this.$v.client.clientTypeID.$dirty) {
                return errors;
            }

            if (!this.$v.client.clientTypeID.required) {
                errors.push('Выберите категорию');
            }

            return errors;
        },
        phoneErrors() {
            let errors = [];

            if (this.client.errors.phone) {
                this.client.errors.phone.forEach((item) => {
                    errors.push(item.message);
                });
            }

            if (!this.$v.client.phone.$dirty) {
                return errors;
            }

            if (!this.$v.client.phone.required) {
                errors.push('Введите номер');
            }
            if (!this.$v.client.phone.minLength) {
                errors.push('Введите корректный номер');
            }

            return errors;
        },
    },
    validations: {
        client: {
            name: {
                required,
                maxLength: maxLength(75),
            },
            clientTypeID: {
                required,
            },
            phone: {
                required,
                minLength: minLength(18),
            },
        },
    },
    methods: {
        init(id) {
            this.client = new Client(id);
        },
        clearErrorPhone() {
            console.log(this.client);
            this.$v.client.phone.$touch();
            this.client.clearError('phone');
        },
        testOnValid() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                this.loadingBtn = false;
                throw 'Проверьте поля формы';
            }
        },
    },
};
