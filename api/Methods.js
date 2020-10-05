export class Methods {
    constructor() {}
    get(url, data) {
        return res(url, data, 'get').then((response) =>
            test(response)
                .then((result) => result)
                .catch((result) => this.redirectTo(result))
        );
    }
    delete(url, data) {
        return res(url, data, 'delete').then((response) =>
            test(response)
                .then((result) => result)
                .catch((result) => this.redirectTo(result))
        );
    }
    post(url, data) {
        return res(url, data, 'post').then((response) =>
            test(response)
                .then((result) => result)
                .catch((result) => this.redirectTo(result))
        );
    }
    put(url, data) {
        return res(url, data, 'put').then((response) =>
            test(response)
                .then((result) => result)
                .catch((result) => this.redirectTo(result))
        );
    }
    redirectTo(result) {
        if (result.status <= 500) {
            window.location.href = '/cabinet/server-error';
        }
        return result;
    }
}
