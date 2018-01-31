const express = require('express');
const bodyparser = require('body-parser');
// let pg = require('pg');
const cors = require('cors')({ origin: true });
const httpRequest = require('request');
const url = require('url');
const sms = require('./twilioAuth');
var client = require('twilio')(
    sms.TWILIO_ACCOUNT_SID,
    sms.TWILIO_AUTH_TOKEN
);

const PORT = 3000;
let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.post('/api/verifyPhoneNumber', (req, res) => {
    cors(req, res, () => {
        let phoneNumber = req.body.phoneNumber;
        let verificationId = Math.floor(1000 + Math.random() * 9000);
        client.messages.create({
            from: sms.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
            body: "Hi your verification number is " + verificationId
        }).then((message) => {
            res.send({ verificationId });
        });
    });
});

app.listen(PORT, () => {
    console.log("Listening on PORT:" + PORT);
    // console.log("Connected to PostgreSQL PORT: " + pgConfig.port);
});