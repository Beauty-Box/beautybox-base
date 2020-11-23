function getBaseUrl() {
    return process.env.NODE_ENV === 'development'
        ? process.env.FETCH_URL_DEVELOPMENT
        : process.env.FETCH_URL;
}

export { getBaseUrl };
export default getBaseUrl;
