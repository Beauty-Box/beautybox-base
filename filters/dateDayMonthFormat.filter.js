export function dateDayMonthFormat(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    }).format(new Date(date));
}

export default dateDayMonthFormat;
