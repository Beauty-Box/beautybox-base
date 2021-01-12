function addGetSuccess(api, data) {
    api.prototype.get = () =>
        new Promise((resolve, reject) => {
            resolve(data);
        });
}

function addGetError(api, data) {
    api.prototype.get = () =>
        new Promise((resolve, reject) => {
            reject(data);
        });
}

function addPostSuccess(api, data) {
    api.prototype.post = () =>
        new Promise((resolve, reject) => {
            resolve(data);
        });
}

function addPut(api, data) {
    api.prototype.put = () =>
        new Promise((resolve, reject) => {
            resolve(data);
        });
}

function addDelete(api, data) {
    api.prototype.delete = () =>
        new Promise((resolve, reject) => {
            resolve(data);
        });
}

export { addGetSuccess, addGetError, addPostSuccess, addPut, addDelete };
export default { addGetSuccess, addGetError, addPostSuccess, addPut, addDelete };
