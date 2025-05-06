require("dotenv/config");
const jwt = require('jsonwebtoken');
const express = require('express');

const server = express();
server.listen(process.env.SERVER_PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server listening on port: ${ process.env.SERVER_PORT }`);
});

server.post("/generate-token", (req, res) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            name: "Nkululeko Vuyo Zikode"
        };

        const token = jwt.sign(data, jwtSecretKey);

        res.send(token);
    }
    catch (error) {
        console.log("There was issue while creating token");
        console.error(error);
    }
});

server.get("/validate-token", (req, res) => {
    try {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        try {
            // const token = req.header(tokenHeaderKey);
            const token = tokenHeaderKey;

            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                return res.send("Successfully Verified");
            } else {
                // Access Denied
                return res.status(401).send(error);
            }
        } catch (error) {
            // Access Denied
            return res.status(401).send(error);
        }
    }
    catch (error) {
        console.log("There was an issue while validating token");
        console.error(error);
    }
});