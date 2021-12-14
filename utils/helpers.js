export const genderArray = [
    { text: 'Не выбран', value: 0 },
    { text: 'Мужской', value: 1 },
    { text: 'Женский', value: 2 },
];

export const monthArray = [
    {
        text: 'Января',
        value: '01',
        days: 31,
    },
    {
        text: 'Февраля',
        value: '02',
        days: 29,
    },
    {
        text: 'Марта',
        value: '03',
        days: 31,
    },
    {
        text: 'Апреля',
        value: '04',
        days: 30,
    },
    {
        text: 'Мая',
        value: '05',
        days: 31,
    },
    {
        text: 'Июня',
        value: '06',
        days: 30,
    },
    {
        text: 'Июля',
        value: '07',
        days: 31,
    },
    {
        text: 'Августа',
        value: '08',
        days: 31,
    },
    {
        text: 'Сентября',
        value: '09',
        days: 30,
    },
    {
        text: 'Октября',
        value: '10',
        days: 31,
    },
    {
        text: 'Ноября',
        value: '11',
        days: 30,
    },
    {
        text: 'Декабря',
        value: '12',
        days: 31,
    },
];

export const timeArray = [
    { text: '15 мин', value: 15 },
    { text: '30 мин', value: 30 },
    { text: '45 мин', value: 45 },
    { text: '1 час', value: 60 },
    { text: '1 час 15 мин', value: 75 },
    { text: '1 час 30 мин', value: 90 },
    { text: '1 час 45 мин', value: 105 },
    { text: '2 часа', value: 120 },
    { text: '2 часа 15 мин', value: 135 },
    { text: '2 часа 30 мин', value: 150 },
    { text: '2 часа 45 мин', value: 165 },
    { text: '3 часа', value: 180 },
    { text: '3 часа 15 мин', value: 195 },
    { text: '3 часа 30 мин', value: 210 },
    { text: '3 часа 45 мин', value: 225 },
    { text: '4 часа', value: 240 },
    { text: '4 часов 15 мин', value: 255 },
    { text: '4 часа 30 мин', value: 270 },
    { text: '4 часа 45 мин', value: 285 },
    { text: '5 часов', value: 300 },
    { text: '5 часов 15 мин', value: 315 },
    { text: '5 часов 30 мин', value: 330 },
    { text: '5 часов 45 мин', value: 345 },
    { text: '6 часов', value: 360 },
    { text: '6 часов 15 мин', value: 375 },
    { text: '6 часов 30 мин', value: 390 },
    { text: '6 часов 45 мин', value: 405 },
    { text: '7 часов', value: 420 },
    { text: '7 часов 15 мин', value: 435 },
    { text: '7 часов 30 мин', value: 450 },
    { text: '7 часов 45 мин', value: 465 },
    { text: '8 чсов', value: 480 },
    { text: '8 часов 15 мин', value: 495 },
    { text: '8 часов 30 мин', value: 510 },
    { text: '8 часов 45 мин', value: 525 },
    { text: '9 часов', value: 540 },
    { text: '9 часов 15 мин', value: 555 },
    { text: '9 часов 30 мин', value: 570 },
    { text: '9 часов 45 мин', value: 585 },
    { text: '10 часов', value: 600 },
];

export function birthdayTransform(birthdayObj) {
    if (birthdayObj.day && birthdayObj.month) {
        return `${parseInt(birthdayObj.day)} ${
            monthArray.find(item => item.value == birthdayObj.month).text
        } ${birthdayObj.year || ''}`;
    } else {
        return false;
    }
}
