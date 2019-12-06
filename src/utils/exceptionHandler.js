const log4js = require("log4js");

const { Response } = require("../objects/generic");

const logger = log4js.getLogger("exceptionHandler.js");

exports.sendExceptionResponse = (err, req, res, next) => {
    logger.debug("Exception advice invoked.")
    return res.status(401).json(new Response(false, "Generic Exception.", err.message));
    // next();
}