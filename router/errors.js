const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@beautybox/static/src/pages/Errors/NotFound');

export default [
    {
        path: '*',
        name: '404',
        meta: {
            free: true,
            layout: 'empty',
        },
        component: NotFound,
    },
];
