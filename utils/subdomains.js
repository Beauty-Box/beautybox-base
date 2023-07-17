// функция убирает любой поддомен первого уровня из адреса хоста, если есть
// возвращает новый ориджин
export function removeSubdomain(onlyHost = false) {
    let host = location.host;
    const countDots = host.split('.').length;

    const COUNT_DOTS_SUBDOMAIN = 2;

    // нужно проверить что убираем именно поддомен, а не сам домен
    if (countDots > COUNT_DOTS_SUBDOMAIN) {
        // регулярка которая убирает все до точки включая ее
        // если есть поддомен - уберет его, если есть домен с точкой .ru
        // то уберет все до .ru
        host = host.replace(/^[^.]+\./g, '');
    }
    if (onlyHost) {
        return host;
    }
    return `${window.location.protocol}//${host}`;
}

export function getHostWithNewSubdomain(host, subdomain) {
    if (!!subdomain.length) {
        // добавить поддомен subdomain. если его нету только в прод режиме
        if (import.meta.env.PROD && window.location.host !== 'localhost') {
            if (!host.startsWith(`${subdomain}.`)) {
                return `${subdomain}.${host}`;
            }
        }
    }
    return host;
}

export default { removeSubdomain, getHostWithNewSubdomain };
