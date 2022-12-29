const replaceToQuery = {
    methods: {
        getQuery() {
            const index = this.$route.fullPath.indexOf('?');
            return index > -1 ? this.$route.fullPath.slice(index) : '';
        },
        async replaceToQuery(query, needEmit = true) {
            const newQuery = { ...query };
            const tempQuery = { ...this.$route.query };

            Object.keys(newQuery).forEach((item) => {
                if (!Boolean(newQuery[item])) {
                    delete newQuery[item];
                }
            });

            if (JSON.stringify(tempQuery) !== JSON.stringify(newQuery)) {
                await this.$router.replace({ query: newQuery });
                if (needEmit) {
                    this.$bus.$emit('route-update');
                }
            }
        },
    },
};

export { replaceToQuery };
export default replaceToQuery;
