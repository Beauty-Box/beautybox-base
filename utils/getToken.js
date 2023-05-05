export function getToken() {
    const cookie = document.cookie.split('; ');
    console.log(cookie);
    const token = cookie.find((item) => item.includes('auth._token.laravelJWT'));
    console.log(token);
    return token;
}

export default getToken;
