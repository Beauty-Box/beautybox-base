export default function dateMonthShortFormat(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
        .format(new Date(date))
        .slice(0, -3)
        .replace('.', '');
}
