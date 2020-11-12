export function setErrorHandler(store) {
    document.addEventListener('server-error', (e) => {
        store.dispatch('SERVER_ERROR', e.code);
    });
    document.addEventListener('bad-request', (e) => {
        store.dispatch('BAD_REQUEST', e.code);
    });
    document.addEventListener('forbidden', (e) => {
        store.dispatch('FORBIDDEN', e.code);
    });
    document.addEventListener('not-found', (e) => {
        store.dispatch('NOT_FOUND', e.code);
    });
    document.addEventListener('unknown-error', (e) => {
        store.dispatch('UNKNOWN_ERROR', e.code);
    });
    document.addEventListener('many-requests', (e) => {
        store.dispatch('MANY_REQUESTS', e.code);
    });
    document.addEventListener('clear-error', (e) => {
        store.dispatch('CLEAR_ERROR', e.code);
    });
}

export { setErrorHandler };
export default setErrorHandler;
