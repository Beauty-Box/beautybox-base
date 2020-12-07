function timeFilter(value, options) {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(`${options}T${value}`));
}

export { timeFilter };
export default timeFilter;
