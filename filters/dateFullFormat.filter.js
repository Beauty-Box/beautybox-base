export default function dateFullFormat(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
        .format(new Date(date))
        .slice(0, -3);
}
