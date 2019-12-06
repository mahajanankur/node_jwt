const express = require("express");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("config");
const log4js = require("log4js");
const helmet = require("helmet");
//Custom Imports
const authController = require("./src/controllers/auth");
const { sendExceptionResponse } = require("./src/utils/exceptionHandler");

//Custom properties
const { port, profile } = config.get("server");

//Configure log4js - 5140 byte - 5 MB
log4js.configure({
    appenders: {
        console: { type: "console" },
        // file: { type: "file", filename: "hh.log", maxLogSize: 15000 }
    },
    categories: {
        default: { appenders: ["console"], level: "debug" }
        // default: { appenders: ["console", "file"], level: "debug" }
    }
});

const logger = log4js.getLogger("app.js");

//Configure the server
const server = express();

server.use(helmet());

//log4js is used as morgan, use either this or morgan.
server.use(log4js.connectLogger(logger, {
    // level: 'auto'
    level: 'info'
}));

//Configure log4js logger as morgan rest.
// const theHTTPLog = morgan(profile, {
//     "stream": {
//         write: function (log) {
//             logger.info(log);
//         }
//     }
// });

//Configure the rest api logger
// server.use(morgan(profile));
// server.use(theHTTPLog);

//Configure the JSON body parser for request.
server.use(bodyParser.json());

//Server port configuration.
server.listen(port, () => {
    logger.info(`Node server is running on port: ${port}`);
});

//Register the controllers as routers.
server.use("/api/auth", authController);

//Exception Advice - Define all routes above this.
server.use(sendExceptionResponse);
