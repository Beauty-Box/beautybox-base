// TODO: Сделать рефактор и упразднить этот фаил все вспомогательные фунции инклюдить из helpers

/**
 * IsoToRu Возвращает дату в формате 31.01.2020
 * @param {String} date формат '2020-01-31'
 * */
export function IsoToRu(date) {
    if (!date) {
        return null;
    }
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}

/**
 * RuToIso Возвращает дату в формате 2020-01-31
 * @param {String} date формат '31.01.2020'
 * @return {String, Null}
 * */
export function RuToIso(date) {
    if (!date) {
        return null;
    }
    const [day, month, year] = date.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * genTime Возвращает массив времени формата 00:00 с заданым шагом
 * @param {Number} fromHour Начальное значение отсчета времени
 * @param {Number} toHour Конечное значение отчета времени
 * @param {Number} stepMinute Шаг времени
 * @return {Array}
 * */
export function genTime(fromHour = 0, toHour = 24, stepMinute = 15) {
    let arr = [];
    for (let i = fromHour; i < toHour; i++) {
        for (let r = 0; r < 60; r += stepMinute) {
            arr.push(`${i.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`);
        }
    }
    return arr;
}

export function genFullTime(fromHour = 0, stepMinute = 15) {
    let arr = [];
    for (let i = 0; i < 24; i++) {
        let time = i < 24 ? i : i - 24;
        for (let r = 0; r < 60; r += stepMinute) {
            arr.push(`${time.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`);
        }
    }
    return arr;
}

/**
 * getFirstLastDayToWeek Возвращает первый и последний день недели
 * @param {String} date формат '2020-01-31'
 * */
export function getFirstLastDayToWeek(date) {
    let tempDate = new Date(date);
    let first =
        tempDate.getDay() != 0
            ? tempDate.getDate() - tempDate.getDay() + 1
            : tempDate.getDate() - 6;
    let last = first + 6;
    let firstDate = new Date(tempDate.setDate(first));

    let lastTime = tempDate.setDate(last);
    if (last < 7) {
        lastTime = tempDate.setMonth(tempDate.getMonth() + 1);
    }
    let lastDate = new Date(lastTime);
    return { first: firstDate, last: lastDate };
}

/**
 * Получить первый и последний день недели в виде массива [first, last]
 */
export function getFirstLastDayToWeekAsRange() {
    const firstAndLastDay = getFirstLastDayToWeek(new Date());
    return [
        firstAndLastDay.first.toISOString().slice(0, 10),
        firstAndLastDay.last.toISOString().slice(0, 10),
    ];
}

/**
 * Получить вчерашний день в виде массива [ yesterday, yesterday ]
 */
export function getYesterdayAsRange() {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    return [yesterday, yesterday];
}

/**
 * Получить первый и последний день месяца в виде массива [ first, last ]
 */
export function getFirstAndLastDayOfMonthAsRange() {
    const today = new Date();
    const firstDay = new Date(today.setDate(1));
    const lastDay = new Date(today.setMonth(today.getMonth() + 1, 0));

    return [firstDay.toISOString().slice(0, 10), lastDay.toISOString().slice(0, 10)];
}

/**
 * Получить первый и последний день в году в виде массива [ first, last ]
 */
export function getFirstAndLastDayOfYearAsRange() {
    const today = new Date();
    const firstDay = new Date(today.setMonth(1, 1));
    const lastDay = new Date(today.setMonth(13, 0));

    return [firstDay.toISOString().slice(0, 10), lastDay.toISOString().slice(0, 10)];
}

/**
 * hoursLocalTest Возвращает правильное скланение часа
 * @param {Number} t диапазон от 0 до 99 включительно
 * */
export function hoursLocalTest(t) {
    if (!(t >= 10 && t <= 20)) {
        let temp = t % 10;
        if (temp === 1) {
            return 'час';
        }
        if (temp > 1 && temp <= 4) {
            return 'часа';
        }
    }
    return 'часов';
}

/**
 * genArrayTime15min Возвращает массив формата [{text: 15 минут, value: 15}]
 * @param {Number} number лимит от 0 до 99 включительно
 * */
export function genArrayTime15min(number) {
    if (number < 15) {
        return;
    }
    let steps = Math.floor(number / 15);
    let array = [];

    for (let i = 1; i <= steps; i++) {
        let step = i * 15;
        const hours = Math.floor(step / 60);
        const minutes = step % 60;
        array.push({
            text: `${hours ? hours + ' ' + hoursLocalTest(hours) : ''}${
                minutes ? ' ' + minutes + ' минут' : ''
            }`,
            value: step,
        });
    }
    return array;
}

/**
 * convert Возвращает время формата 1 час 15 минут или 1 ч 15 мин
 * @param {Number} number лимит от 0 до 99 включительно
 * @param {Boolean} short формат времени
 * */
export function convertMinutesToHours(number, short = false) {
    const hours = Math.floor(number / 60);
    const minute = hours * 60;
    const remainder = (number - minute) % 60;
    return `${hours ? hours + ' ' + (short ? 'ч' : hoursLocalTest(hours)) : ''}${
        remainder ? ' ' + remainder + (short ? ' мин' : ' минут') : ''
    }`;
}

/**
 * genNumberArray Возвращает массив чисел формата [0, 1, 2]
 * @param {Number} from начало
 * @param {Number} to конец
 * @return {Array<Number>}
 * */
export function genNumberArray(from, to) {
    let array = [];
    for (let i = from; i <= to; i++) {
        array.push(i);
    }
    return array;
}

/**
 * genNumberStringArray Возвращает массив чисел в виде строки формата ['0', '1', '2']
 * @param {Number} from начало
 * @param {Number} to конец
 * @return {Array<String>}
 * */
export function genNumberStringArray(from, to) {
    let array = [];
    for (let i = from; i <= to; i++) {
        array.push(`${i}`);
    }
    return array;
}

/**
 * genNumberStringArrayRevert Возвращает массив чисел в виде строки формата ['2', '1', '0']
 * @param {Number} from начало
 * @param {Number} to конец
 * */
export function genNumberStringArrayRevert(from, to) {
    let array = [];
    for (let i = to; i >= from; i--) {
        array.push(`${i}`);
    }
    return array;
}

/**
 * genDayArrayForSelect Возвращает массив чисел в виде строки формата [{ text: 1, value: '01'}]
 @param {Number} to
 * */
export function genDayArrayForSelect(to) {
    let array = [];
    for (let i = 1; i <= to; i++) {
        array.push({
            text: i,
            value: i.toString().padStart(2, '0'),
        });
    }
    return array;
}

export function getBaseUrl() {
    return import.meta.env.VITE_FETCH_URL;
}

/**
 * joinQueryObj Возвращает строку queryString параметров вида ?query=1&query=2
 * @param {Object} queryObj принимаемы обьект вида { query: 1 }
 * @param {String} queryString принимаемая и возращаемая строка query параметров
 * */
export function joinQueryObj(queryObj = {}, queryString = '') {
    let first = true;
    let symbol = queryString.length ? '&' : '?';

    if (!Object.keys(queryObj).length) {
        return '';
    }

    return Object.keys(queryObj).reduce((acc, key) => {
        if (first) {
            acc += symbol + key + '=' + queryObj[key];
        } else {
            acc += '&' + key + '=' + queryObj[key];
        }
        first = false;
        return acc;
    }, queryString);
}

/**
 * joinQuery Возвращает строку queryString параметров вида ?query=1&query=2
 * @param {String} uri принимаемы обьект вида { query: 1 }
 * @param {String} key ключ параметра
 * @param {String, Number} value значение параметра
 * */
export function joinQuery(uri = '', key = '', value = '') {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
        return uri + separator + key + '=' + value;
    }
}

/**
 * SortArrayByArray Сотрирует передааный массив fromArr по массиву onArr
 * И вырезает из массива fromArr элемент присутствующий в массиве onArr
 * @param {Array} onArr Эталонный массив
 * @param {Array} fromArr Сортируемый массив
 * @return {Array} Отфильтрованный и отсортированный массив
 * */
export function SortArrayByArray(fromArr = [], onArr = []) {
    return onArr.filter(item => {
        let result = fromArr.indexOf(item);
        if (result !== -1) {
            fromArr.splice(result, 1);
            return true;
        } else {
            return false;
        }
    });
}

/**
 * getDayOfWeek Возвращает текущий день недели в зависимости от переданной даты
 * @param {Date<String>} date формат '2020-01-31'
 * @return {String, Null}
 * */
export function getDayOfWeek(date) {
    return new Date(date).toLocaleString('ru-RU', { weekday: 'long' });
}

/**
 * Преобразовывает объект в строку для GET запроса
 * @param {Object} object Объект для преобразования
 * @return {String}
 */
export function objectToURLParams(object) {
    return '?' + new URLSearchParams(object);
}

/**
 * isNumber проверяет входную строку на число
 * @param {String} string Тестируемая строка
 * @return {Boolean}
 * */
export function isNumber(string = '') {
    const regexp = new RegExp('^[1-9][0-9]*(?:\\.[0-9]+)?\\$?$');
    return regexp.test(string);
}

/**
 * getCoordinatesFromYandex получает кординаты адреса через Яндекс API
 * @param {String} address
 * @return {Array} Массив с координатами
 * */
export async function getCoordinatesFromYandex(address = '') {
    try {
        let coordinates = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.YANDEX_API_KEY}&geocode=${address}`,
            {
                method: 'GET',
                cors: true,
            }
        );
        if (coordinates.ok) {
            let { response } = await coordinates.json();
            console.log('--- coordinates', response);
            return response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(' ')
                .reverse();
        } else {
            console.log('--- getCoordinatesFromYandex', coordinates.status);
        }
    } catch (e) {
        console.log('--- getCoordinatesFromYandex', e);
    }
}

/**
 * parsePhone преобразует телефон формата +7 (999) 999-99-99 к 89999999999
 * @param {String} phone
 * */
export function parsePhone(phone = '') {
    return String(phone)
        .replace(/^\+7/, '8')
        .replace(/\W/g, '');
}
