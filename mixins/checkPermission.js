import { mapGetters } from 'vuex';

const checkPermission = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters(['USER_INFO']),
            },
            methods: {
                /**
                 * checkPermission Проверяет есть ли прово у пользователя и возвращает true или false
                 * @param {String, Array} permission
                 * */
                checkPermission(permission) {
                    let temp = options.store.getters.USER_INFO;
                    const test = (item) => temp.permission.indexOf(item) !== -1;
                    if (Object.keys(temp).length && temp.hasOwnProperty('permission')) {
                        if (typeof permission === 'string') {
                            return test(permission);
                        }
                        if (typeof permission === 'object' && Array.isArray(permission)) {
                            return !!permission.find((item) => {
                                return test(item);
                            });
                        }
                    }
                    return false;
                },
            },
        });
    },
};

export { checkPermission };
export default checkPermission;
