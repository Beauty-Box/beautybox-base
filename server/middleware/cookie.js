const cookie = require('cookie-universal');

module.exports.cookieParse = function (req, res, next) {
    req.cookieParse = cookie(req, res);
    next();
};
