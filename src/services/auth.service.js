const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const config = require("config");

const { salt } = config.get("jwt");
const logger = log4js.getLogger("auth.service.js");

exports.generateToken = async (req) => {
    let body = req.body;
    //expiresIn: expressed in seconds
    let token = await jwt.sign(body, salt, { expiresIn: 60 });
    logger.info(`JWT sign method response: ${token}`);
    return token;
}

exports.verifyToken = async (req) => {
    let token = req.header("Auth");
    logger.info(`Auth header received: ${token}`);
    let decoded = null;
    try {
        decoded = await jwt.verify(token, salt);
        logger.info(`JWT verify method response: ${decoded}`);
    } catch (error) {
        logger.error(`JWT verify method error: ${error}`);
        throw new Error(error);
        // next(new Error("Not a valid token."));
    }

    return decoded;
}