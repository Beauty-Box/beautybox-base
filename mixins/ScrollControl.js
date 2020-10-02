/**
 * Обязательные параметры должны быть определены в компоненте
 * @param {Number} nowItemsLength - текущая длинна массива
 * @param {Number} allItemsLength - количество элементов
 * @param {Boolean} readyToGetElements - флаг готов ли получить данные
 * @param {Function} onScrollEndHandler - функция выполняемая в конце скрола
 * @param {Number} heightForActiveScroll - Количество пикселей до срабатывания функции по умолчанию 800
 * */

export const scroll = {
    data: () => ({
        bottom: false,
        heightForActiveScroll: 800,
    }),
    computed: {
        readyToGetElementsForChildren: {
            get() {
                return this.readyToGetElements;
            },
            set(value) {
                this.$emit('changeReadyToGetElements', value);
            },
        },
    },
    methods: {
        bottomVisible(element) {
            return (
                element.scrollTop >=
                element.scrollHeight - element.clientHeight - this.heightForActiveScroll
            );
        },
        onScrollControl(e) {
            if (this.readyToGetElementsForChildren) {
                this.bottom = this.bottomVisible(e.target);
            }
        },
    },
    watch: {
        async bottom(bottom) {
            if (bottom) {
                bottom = false;
                this.readyToGetElementsForChildren = false;

                if (this.nowItemsLength < this.allItemsLength) {
                    await this.onScrollEndHandler(this.$route.query, this.nowItemsLength);
                }
            }
        },
    },
};
