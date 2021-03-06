function dateMonthYearFormatFilter(date, monthType = 'short') {
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: monthType,
        day: 'numeric',
    })
        .format(new Date(date))
        .slice(0, -3)
        .replace('.', '');
}

export { dateMonthYearFormatFilter };
export default dateMonthYearFormatFilter;
