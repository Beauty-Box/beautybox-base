const errorHandler = {
    created() {
        document.addEventListener('server-error', (e) => {
            this.$store.dispatch('SERVER_ERROR', e.code);
        });
        document.addEventListener('bad-request', (e) => {
            this.$store.dispatch('BAD_REQUEST', e.code);
        });
        document.addEventListener('forbidden', (e) => {
            this.$store.dispatch('FORBIDDEN', e.code);
        });
        document.addEventListener('not-found', (e) => {
            this.$store.dispatch('NOT_FOUND', e.code);
        });
        document.addEventListener('unknown-error', (e) => {
            this.$store.dispatch('UNKNOWN_ERROR', e.code);
        });
        document.addEventListener('clear-error', (e) => {
            this.$store.dispatch('CLEAR_ERROR', e.code);
        });
    },
};

export { errorHandler };
export default errorHandler;
