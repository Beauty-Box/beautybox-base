export function getToken() {
    const cookie = document.cookie.split(';');
    console.log(cookie);
    const token = cookie.find((item) => item.includes('token'));
    console.log(token);
    return token;
}

export default getToken;
