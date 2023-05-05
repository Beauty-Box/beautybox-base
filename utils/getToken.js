export function getToken() {
    const cookie = document.cookie.split('; ');
    console.log(cookie);
    const token = cookie.find((item) => item.includes('auth._token.laravelJWT'));
    console.log(token);
    if (!!token) {
        const tokenParts = token.split('=');
        const tokenWithoutType = tokenParts[1].replace('Bearer ', '');
        return tokenWithoutType;
    }
    return null;
}

export default getToken;
