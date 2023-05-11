// функция убирает любой поддомен первого уровня из адреса хоста, если есть
// возвращает новый ориджин
export function removeSubdomain() {
    let host = location.host;
    const countDots = host.split('.').length;

    const COUNT_DOTS_SUBDOMAIN = 2;

    // нужно проверить что убираем именно поддомен, а не сам домен
    if (countDots > COUNT_DOTS_SUBDOMAIN) {
        // host = host.replace('link.', '');
        // регулярка которая убирает все до точки включая ее
        // если есть поддомен - уберет его, если есть домен с точкой .ru
        // то уберет все до .ru
        host = host.replace(/^[^.]+\./g, '');
    }
    return `${window.location.protocol}//${host}`;
}

export default removeSubdomain;
