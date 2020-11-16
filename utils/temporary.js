import { Api } from "../api";

export async function logout(e) {
    e.preventDefault();

    try {
        await new Api(process.env.BASE_URL, 'auth').post('/logout');
        await window.localStorage.clear();
        window.location.replace(`${window.location.origin}/auth/sign-in`);
    } catch (e) {
        console.log(e);
    }
}
