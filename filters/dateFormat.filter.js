function dateFormat(date, monthType = 'short') {
    return new Intl.DateTimeFormat('ru-RU', {
        weekday: 'short',
        day: 'numeric',
        month: monthType,
    }).format(new Date(date));
}

export { dateFormat };
export default dateFormat;
