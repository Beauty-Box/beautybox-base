export function getToken() {
    const cookie = document.cookie.split('; ');
    const token = cookie.find((item) => item.includes('auth._token.laravelJWT'));
    if (!!token) {
        const tokenParts = token.split('=');
        const tokenWithoutType = tokenParts[1].replace('Bearer ', '');
        return tokenWithoutType;
    }
    return null;
}

export default getToken;
