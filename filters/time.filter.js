function timeFilter(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export { timeFilter };
export default timeFilter;
