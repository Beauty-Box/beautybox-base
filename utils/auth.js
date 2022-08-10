import { setParams, parseJwt } from '../router/utils';

export function redirectToBack() {
    const from = window.localStorage.getItem('from');
    window.localStorage.removeItem('from');

    if (from) {
        window.location.replace(from);
    } else {
        window.location.replace(window.location.origin + '/cabinet');
    }
}

export async function setToken(response) {
    if (response['access_token']) {
        await window.localStorage.setItem('access_token', response['access_token']);
        await setParams();
        redirectToBack();
    }
}

export function setAuthToken(token) {
    if (token) {
        const domain = 'path=/';
        const jwt = parseJwt(token);
        window.localStorage.setItem('auth._token.laravelJWT', 'Bearer ' + token);
        window.localStorage.setItem('auth.strategy', 'laravelJWT');
        window.localStorage.setItem('auth._refresh_token_expiration.laravelJWT', jwt.iat + 129600);
        window.localStorage.setItem('auth._refresh_token.laravelJWT', 'true');
        window.localStorage.setItem('access_token', token);
        window.localStorage.setItem('auth._token_expiration.laravelJWT', jwt.iat + 129600);
        document.cookie = 'auth._token.laravelJWT=' + 'Bearer ' + token + '; ' + domain;
        document.cookie = 'auth.strategy=' + 'laravelJWT; ' + domain;
        document.cookie =
            'auth._refresh_token_expiration.laravelJWT=' + jwt.iat + 129600 + '; ' + domain;
        document.cookie = 'auth._refresh_token.laravelJWT=' + 'true; ' + domain;
        document.cookie = 'auth._token_expiration.laravelJWT=' + jwt.iat + 129600 + '; ' + domain;
    }
}
