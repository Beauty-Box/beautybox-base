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
    }

    _resConvert(res) {
        console.log('res-test', res);
        if (res.error) {
            console.log('res-error', res);
            return;
        }
        Object.assign(this, res);
    }

    _initFormData(formData) {
        formData.append('name', this.name);
        formData.append('phone', this.phone);
        formData.append('birthday', this.convertBirthday);
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
        if (!this.birthday.day || !this.birthday.month) {
            return 'null.null.null';
        } else {
            return `${this.birthday.day}.${this.birthday.month}.${this.birthday.year || null}`;
        }
    }
    clearError(error) {
        if (!error) {
            this.errors = {};
        } else {
            delete this.errors[error];
        }
        this.errors = { ...this.errors };
    }
}
