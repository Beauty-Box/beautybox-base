import { Provider } from './Provider';

export class Person extends Provider {
    constructor(config) {
        super(config);
        this.errors = {};
        this.name = '';
        this.phone = '';
        this.email = '';
        this.gender = 0;
        this.birthday = {
            day: '',
            month: '',
            year: '',
        };
        //this.birthday = '';
    }

    _resConvert(res) {
        console.log('res-test', res);
        if (res.error) {
            console.log('res-error', res);
            return;
        }
        res.birthday = this.parseBirthday(res.birthday);
        Object.assign(this, res);
    }

    _initFormData(formData) {
        formData.append('name', this.name);
        formData.append('phone', this.phone);
        if (!!this.convertBirthday) {
            formData.append('birthday', this.convertBirthday);
        }
        formData.append('comment', this.comment);
        formData.append('gender', this.gender);
        formData.append('email', this.email);
        if (this.deleteFile) {
            formData.append('deleteFile', true);
        } else if (this.avatarUpdate) {
            if (this.avatarAsFile) {
                formData.append('file', this.avatarAsFile);
            }
            formData.append('avatarUpdate', true);
            formData.append('rotate', 0);
            formData.append('crop', JSON.stringify(this.crop));
        }
    }

    get convertBirthday() {
        if (!this.birthday.day || !this.birthday.month || !this.birthday.year) {
            return null;
        } else {
            return `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}`;
        }
    }
    parseBirthday(birthday) {
        if (!!birthday) {
            const date = new Date(birthday);
            console.log('birthdate', date);
            return {
                day: date.getDate().toString().padStart(2, '0'),
                month: (date.getMonth() + 1).toString().padStart(2, '0'),
                year: date.getFullYear().toString(),
            };
        } else {
            return {
                day: '',
                month: '',
                year: '',
            };
        }
    }
    // /**
    //  * конвертирует строку дня рождения в объект
    //  */
    // get convertBirthday() {
    //     if (!!this.birthday) {
    //         const date = new Date(this.birthday);
    //         console.log('birthdate', date);
    //         return {
    //             day: date.getDate().toString(),
    //             month: (date.getMonth() + 1).toString(),
    //             year: date.getFullYear().toString(),
    //         };
    //     } else {
    //         return {
    //             day: '',
    //             month: '',
    //             year: '',
    //         };
    //     }
    // }
    //
    // /**
    //  * записывает один параметр даты дня рождения в объект date и в строку
    //  * @typedef { Object } Birthday
    //  * @property { String } param ключ день месяц или год
    //  * @property { String } value значение день месяц или год
    //  * @param { Birthday } date объект с полями param и value
    //  */
    // setBirthday({ param, value }) {
    //     const date = this.convertBirthday;
    //     date[param] = value;
    //     this.birthday = `${date.day}-${date.month}-${date.year}`;
    // }

    clearError(error) {
        if (!error) {
            this.errors = {};
        } else {
            delete this.errors[error];
        }
        this.errors = { ...this.errors };
    }
}
