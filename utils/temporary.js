import { Api } from "../api";

export async function logout(e) {
    e.preventDefault();

    try {
        await new Api(process.env.BASE_URL, 'auth', localStorage.getItem('access_token')).post('/logout');
        await window.localStorage.clear();
        await window.localStorage.setItem('from', window.location.href);
        window.location.replace(`${window.location.origin}/auth/sign-in`);
    } catch (e) {
        console.log(e);
    }
}
