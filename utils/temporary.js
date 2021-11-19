import { Api } from "../api";

export async function logout(e) {
    e.preventDefault();

    try {
        await new Api(process.env.BASE_URL, 'auth', localStorage.getItem('access_token')).post('/logout');
        await window.localStorage.clear();
        window.location.replace(`${window.location.origin}/auth/sign-in`);
    } catch (e) {
        console.log(e);
    }
}

/**
 *  после логаута вставляет в параметры uri предыдущей страницы, для повторного логина
 *  Используется только в Линке
 * @param e - event
 * @param from - origin uri, to relogin after logout
 * @returns {Promise<void>}
 */
export async function logoutWithFrom(e, from) {
    e.preventDefault();

    try {
        await new Api(process.env.BASE_URL, 'auth', localStorage.getItem('access_token')).post('/logout');
        if (from) {
            window.location.replace(`${window.location.origin}/auth/sign-in?from=${from}`);
        } else {
            window.location.replace(`${window.location.origin}/auth/sign-in`);
        }
        await window.localStorage.clear();
    } catch (e) {
        console.log(e);
    }
}
