const AppPageNotFound = () =>
    import(/* webpackChunkName: "page-not-found" */ '@beautybox/static/src/pages/Errors/NotFound');

const errorsRoutes = [
    {
        path: '*',
        name: '404',
        meta: {
            free: true,
            layout: 'empty',
        },
        component: AppPageNotFound,
    },
];

export { errorsRoutes };
export default { errorsRoutes };
