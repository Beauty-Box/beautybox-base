module.exports = (req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
        req.url = '/'; // this would make express-js serve index.html
    }
    next();
};
