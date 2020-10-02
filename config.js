console.log(
process.env.NODE_ENV === 'production'
    ? process.env.FETCH_URL
    : process.env.FETCH_URL_DEVELOPMENT)

export default {
    BASE_URL:
        process.env.NODE_ENV === 'production'
            ? process.env.FETCH_URL
            : process.env.FETCH_URL_DEVELOPMENT,
};
