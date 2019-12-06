const express = require("express");
const log4js = require("log4js");
//Custom Imports
const { Response } = require("../objects/generic");
const { generateToken, verifyToken } = require("../services/auth.service");

const logger = log4js.getLogger("auth.controller.js");

//Get router from express
const router = express.Router();

router.post("/token", async (req, res, next) => {
    let token = await generateToken(req);
    res.json(new Response(true, "Generated token.", token));
});

router.get("/token/verify", async (req, res, next) => {
    let verify;
    try {
        verify = await verifyToken(req);
    } catch (error) {
        res.status(401).json(new Response(false, "Token is not valid."));
        return;
    }

    res.json(new Response(true, "Verified token.", verify));
});


//Make sure to export the router otherwise below error would be thrown 
//TypeError: Router.use() requires a middleware function but got a Object
module.exports = router;