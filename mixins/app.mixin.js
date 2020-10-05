// import { mapGetters } from 'vuex';
// import { checkBrowserType } from '@beautybox/utils/browserEnvironment';
const EmptyLayout = () =>
    import(/* webpackChunkName: "EmptyLayout" */ '@beautybox/ui-kit/layouts/EmptyLayout');
const ErrorLayout = () =>
    import(/* webpackChunkName: "ErrorLayout" */ '@beautybox/ui-kit/layouts/ErrorLayout');
const Forbidden = () =>
    import(/* webpackChunkName: "Forbidden" */ '@beautybox/static/src/pages/Errors/Forbidden');
const NotFound = () =>
    import(/* webpackChunkName: "NotFound" */ '@beautybox/static/src/pages/Errors/NotFound');
const ServerError = () =>
    import(/* webpackChunkName: "ServerError" */ '@beautybox/static/src/pages/Errors/ServerError');
const BadRequest = () =>
    import(/* webpackChunkName: "BadRequest" */ '@beautybox/static/src/pages/Errors/BadRequest');
const UnknownError = () =>
    import(
        /* webpackChunkName: "UnknownError" */ '@beautybox/static/src/pages/Errors/UnknownError'
    );

export const useApp = {
    components: {
        EmptyLayout,
        ErrorLayout,
        Forbidden,
        NotFound,
        ServerError,
        BadRequest,
        UnknownError,
    },
    computed: {
        layout() {
            //     if (this.ERROR) {
            //         return this.TYPE;
            //     } else {
            return (this.$route.meta.layout || 'empty') + '-layout';
            // }
        },
        // ...mapGetters(['ERROR', 'TYPE']),
    },
    // created() {
    //     window.addEventListener('load', this.checkBrowserType);
    //     window.addEventListener('resize', this.checkBrowserType);
    // },
    // beforeDestroy() {
    //     window.removeEventListener('load', this.checkBrowserType);
    //     window.removeEventListener('resize', this.checkBrowserType);
    // },
    // methods: {
    //     checkBrowserType,
    // },
};