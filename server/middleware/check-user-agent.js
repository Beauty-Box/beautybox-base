// const { matchesUA } = require('browserslist-useragent');
const { resolve } = require('path');
const { testOnMobile } = require(resolve(process.cwd(), 'utils', 'helpers'));

module.exports.checkUserAgent = function(req, res, next) {
    try {
        // const isModuleCompatible = matchesUA(req.headers['user-agent'], {
        //     browsers: ['supports es6-module'],
        //     allowHigherVersions: true,
        // });
        res.mobile = testOnMobile(req.headers['user-agent']);

        // res.locals.isModuleCompatible = isModuleCompatible;
    } catch (error) {
        console.error(error);
        // res.locals.isModuleCompatible = false;
        res.mobile = false;
    } finally {
        next();
    }
};
