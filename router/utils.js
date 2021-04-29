function getTokenFromCookie() {
    let cookie = document.cookie.split(';');
    let crm_token = cookie.find(item => item.includes('crm_token'));
    if (crm_token) {
        let token = crm_token.slice(11);
        window.localStorage.setItem('access_token', token);
        return token;
    }
    window.location.href = `/auth/index.html/#/sign-in?module=cabinet&from=${window.location.href}`;
    return '';
}

function getJWT() {
    let jwt = window.localStorage.getItem('access_token');
    if (!jwt) {
        jwt = getTokenFromCookie();
    }
    return jwt;
}

function parseJwt(token = '') {
    try {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.log('parseJwt error', e);
        return {};
    }
}

function setParams() {
    let jwt = getJWT();
    let jwtObj = parseJwt(jwt);
    let userID = jwtObj.userID;
    let addressID = jwtObj.addressID;

    console.log('--- jwtObj', jwtObj);
    console.log('--- userID', userID);
    console.log('--- addressID', addressID);

    if (!userID && !addressID) {
        window.location.href = `/auth/index.html/#/sign-in?from=${window.location.href}`;
        return 0;
    } else {
        window.localStorage.setItem('userID', userID);
        window.localStorage.setItem('addressID', addressID);
    }
}

export { getTokenFromCookie, getJWT, parseJwt, setParams };
export default { getTokenFromCookie, getJWT, parseJwt, setParams };
