const request = {
    data: () => ({
        mainRequest: null,
    }),
    methods: {
        /**
         * requestAll Параллельно кидает запросы переданные в массив
         * @param {Array} array
         * */
        requestAll(array) {
            try {
                if (Array.isArray(array)) {
                    this.mainRequest = Promise.all(array);
                } else {
                    this.messageError('Передаваемый параметр не является массивом');
                    throw 'Передаваемый параметр не является массивом';
                }
            } catch (e) {
                this.$router.replace({
                    name: '404',
                    params: { pathMatch: this.$route.path },
                });
            }
        },
        /**
         * requestEnd Разрешает промис заданый функцией requestAll
         * @param {Function} f Колбек функция resolve
         * @param {Function} e Колбек функция reject
         * */
        requestEnd(f, e) {
            this.mainRequest.then(f).catch(e);
        },
    },
};

export { request };
export default request;
