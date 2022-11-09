function priceFilter(number, minimumFractionDigits = 0) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits,
        style: 'currency',
        currency: 'RUB',
    }).format(number || 0);
}

export { priceFilter };
export default priceFilter;
