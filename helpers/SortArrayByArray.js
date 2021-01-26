/**
 * @description SortArrayByArray Сотрирует передааный массив fromArr по массиву onArr
 * И вырезает из массива fromArr элемент присутствующий в массиве onArr
 * @param {Array} onArr Эталонный массив
 * @param {Array} fromArr Сортируемый массив
 * @return {Array} Отфильтрованный и отсортированный массив
 * */
function SortArrayByArray(fromArr = [], onArr = []) {
    if (toString.call(fromArr).slice(8, -1) !== 'Array') {
        throw new TypeError('Передаваемый параметр не является массив');
    }
    if (toString.call(onArr).slice(8, -1) !== 'Array') {
        throw new TypeError('Эталонный параметр не является массивом');
    }
    return onArr.filter(item => {
        let result = fromArr.indexOf(item);
        if (result !== -1) {
            fromArr.splice(result, 1);
            return true;
        } else {
            return false;
        }
    });
}

export { SortArrayByArray };
export default SortArrayByArray;
