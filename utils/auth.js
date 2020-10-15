import { setParams } from '../router/utils';

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
