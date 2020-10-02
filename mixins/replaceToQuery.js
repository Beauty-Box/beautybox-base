export default {
    methods: {
        getQuery() {
            const index = this.$route.fullPath.indexOf('?');
            return index > -1 ? this.$route.fullPath.slice(index) : '';
        },
        async replaceToQuery(query) {
            console.log(query);
            let newQuery = { ...query };
            console.log(this.$route.query);
            let test = { ...this.$route.query };
            Object.keys(newQuery).forEach((item) => {
                if (!Boolean(newQuery[item])) {
                    delete newQuery[item];
                }
            });

            // Object.keys(test).forEach((item) => {
            //     if (parseFloat(test[item]) == test[item] && newQuery[item]) {
            //         test[item] = parseInt(test[item]);
            //         newQuery[item] = parseInt(newQuery[item]);
            //     }
            // });
            console.log('test', JSON.stringify(test));
            console.log('newQuery', JSON.stringify(newQuery));
            if (JSON.stringify(test) !== JSON.stringify(newQuery)) {
                console.log('Ура!');
                await this.$router.replace({ query: newQuery });
                this.$bus.$emit('route-update');
            }
        },
    },
};
