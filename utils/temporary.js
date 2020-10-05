import { Provider } from '@beautybox/entity/Provider';

export async function logout(e) {
    e.preventDefault();

    try {
        await new Provider('auth')._provider.post('/logout');
        await window.localStorage.clear();
        window.location.replace(
            `${window.location.origin}/auth/sign-in?from=${window.location.href}`
        );
    } catch (e) {
        console.log(e);
    }
}
