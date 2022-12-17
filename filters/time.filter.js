function timeFilter(value) {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}

export { timeFilter };
export default timeFilter;
