function dateWeekdayFormatFilter(date, weekdayType = 'short') {
    return new Intl.DateTimeFormat('ru-RU', {
        weekday: weekdayType,
    })
        .format(new Date(date))
}

export { dateWeekdayFormatFilter };
export default dateWeekdayFormatFilter;
