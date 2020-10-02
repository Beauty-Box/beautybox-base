export default function dateFullFormat(date, type = 'long') {
    return new Intl.DateTimeFormat('ru-RU', { weekday: type }).format(new Date(date));
}
