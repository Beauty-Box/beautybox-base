import { Api } from '../api';

export async function logout(e) {
    e.preventDefault();

    try {
        await new Api(
            import.meta.env.VITE_BASE_URL,
            'auth',
            localStorage.getItem('access_token')
        ).post('/logout');
        if (this.$store.hasModule('Accounts')) {
            console.log('accounts module found');
            const currentUserID = this.$store.getters['USER_ID'];
            console.log('currentUserID logout', currentUserID);
            await this.$store.dispatch('REMOVE_ACCOUNT', currentUserID);
        } else {
            logoutAll();
        }
    } catch (e) {
        console.log(e);
    }
}

export function logoutAll() {
    window.localStorage.clear();
    window.localStorage.setItem('from', window.location.href);
    window.location.replace(`${window.location.origin}/auth/sign-in`);
}
