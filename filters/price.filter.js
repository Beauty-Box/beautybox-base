function priceFilter(number) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        style: 'currency',
        currency: 'RUB',
    }).format(number);
}

export { priceFilter };
export default priceFilter;
