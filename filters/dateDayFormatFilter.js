function dateDayFormatFilter(date, type = 'long') {
    return new Intl.DateTimeFormat('ru-RU', { weekday: type }).format(new Date(date));
}

export { dateDayFormatFilter };
export default dateDayFormatFilter;
