/**
 * Если в пришедешем с бека таймстампе есть пробел - заменяем его на T
 * Без этого некоторые браузеры не могут распарсить таймстамп при создании объекта даты
 * @param {String} timestamp
 * @returns {String}
 */
export function normalizeTimestamp(timestamp) {
    if (timestamp.includes(' ')) {
        return timestamp.replace(' ', 'T');
    }
    return timestamp;
}

export default normalizeTimestamp;
