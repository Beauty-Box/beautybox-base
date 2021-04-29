export class TestStatus {
    statusHandler(response) {
        return new Promise(async (resolve, reject) => {
            const status = `s${response.status}`;
            if (!this[status]) {
                return reject(this.getErrorMessage('Статус не распознан', 0));
            }
            if (response.ok) {
                return resolve(await this[status](response));
            } else {
                return reject(await this[status](response));
            }
        });
        // if (response.ok) {
        //     if (response.status === 204) {
        //         return;
        //     }
        //     if (response.status === 201) {
        //         return response.headers.get('Location');
        //     }
        //     return await response.json();
        // } else {
        //     switch (response.status) {
        //         case 401:
        //             window.localStorage.clear();
        //             window.location.href = '/sign-in'
        //             break;
        //         case 404:
        //             throw (
        //                 (await response.json()).errors.message || 'Запрашиваемый ресурс не найден'
        //             );
        //             break;
        //         case 422:
        //             throw {
        //                 code: 422,
        //                 errors: (await response.json()).errors,
        //             };
        //             break;
        //         case 500:
        //             throw (
        //                 (await response.json()).errors.message ||
        //                 'Произошла ошибка на стороне сервера'
        //             );
        //             break;
        //         default:
        //             throw (await response.json()).errors.message || 'Произошла ошибка при запросе';
        //     }
        // }
    }
    getErrorMessage(message, status) {
        return {
            status,
            errors: {
                message,
            },
        };
    }
    async getBody(response) {
        if (!String(response.headers.get('content-type')).includes('application/json')) {
            return {};
        }
        return await response.json();
    }
    async getError(response, message) {
        const body = await this.getBody(response);
        body.status = response.status;
        const errors = body.errors;
        return errors ? body : this.getErrorMessage(message, response.status);
    }
    async s200(response) {
        return await this.getBody(response);
    }
    async s201(response) {
        return { location: response.headers.get('Location') };
    }
    async s203(response) {
        return await this.getBody(response);
    }
    async s204() {
        return {};
    }
    async s400(response) {
        return await this.getError(response, 'Некорректный запрос');
    }
    async s401(response) {
        return await this.getError(response, 'Доступ запрещен');
    }
    async s403(response) {
        return await this.getError(response, 'Доступ запрещен');
    }
    async s404(response) {
        return await this.getError(response, 'Не найдено');
    }
    async s422(response) {
        return await this.getError(response, 'Не прошло валидацию');
    }
    async s500(response) {
        return await this.getError(response, 'Произошла ошибка на сервере');
    }
    async s501(response) {
        return await this.getError(response, 'Произошла ошибка на сервере');
    }
    async s502(response) {
        return await this.getError(response, 'Произошла ошибка на сервере');
    }
    async s503(response) {
        return await this.getError(response, 'Произошла ошибка на сервере');
    }
    async s504(response) {
        return await this.getError(response, 'Произошла ошибка на сервере');
    }
}
