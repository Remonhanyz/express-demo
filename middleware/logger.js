
function log(req, res, next) {
    next(); //go to next middleware in the pipe line
}

module.exports = log;