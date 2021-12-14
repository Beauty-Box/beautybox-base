/**
 * @description parsePhone преобразует телефон формата +7 (999) 999-99-99 к 89999999999
 * @param {String} phone
 * */
function parsePhone(phone = '') {
    if (phone === '') {
        return phone;
    }
    let pattern = new RegExp('');
    return String(phone)
        .replace(/^\+7/, '8')
        .replace(/\W/g, '');
    // [0-9- ]
}

export { parsePhone };
export default parsePhone;
