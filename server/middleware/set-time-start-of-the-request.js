module.exports.setTimeStartOfTheRequest = (req, res, next) => {
    res.timeStart = Date.now();
    next();
};
