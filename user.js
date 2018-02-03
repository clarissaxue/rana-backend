let app = require('./index');
//const cors = module.exports = require('cors')({ origin: true });
const url = module.exports = require('url');
// const sms = require('./twilioAuth');
// var client = require('twilio')(
//     sms.TWILIO_ACCOUNT_SID,
//     sms.TWILIO_AUTH_TOKEN
// );

// const verifyPhoneNumber (req, res) => {
//     let phoneNumber = req.body.phoneNumber;
//     let verificationId = Math.floor(1000 + Math.random() * 9000);
//     client.messages.create({
//         from: sms.TWILIO_PHONE_NUMBER,
//         to: phoneNumber,
//         body: "Hi your verification number is " + verificationId
//     }).then((message) => {
//         res.send({ verificationId });
//     });
// });

const getUserData = (req, res) => {
    let pool = app.pool;
    let urlObj = url.parse(req.url, true);
    const phoneNumber = urlObj.query.phoneNumber;
    console.log('SELECT * FROM "ACCOUNTS" WHERE "phoneNumber" =  \'' + phoneNumber + "';");
    pool.connect((error, postgresDB, done) => {
        if (error) {
            console.error("I got an error: " + error);
            response.status(500).send({ error });
        } else {
            postgresDB.query(   //MAKE THE QUERY TO POSTGRES
                'SELECT * FROM "ACCOUNTS" WHERE "phoneNumber" =  \'' + phoneNumber + "';",
                (err, table) => {
                    done();
                    if (err) {
                        return res.send({ err });
                    } else {
                        return res.send(table.rows);    //SEND DATA BACK
                    }
                }
            )
        }
    });
}

const createAccount = (req, res) => {
    let pool = app.pool;
    let data = req.body.data;
    console.log('INSERT INTO "ACCOUNTS" VALUES (\'' + data.phoneNumber + "', '" + data.firstName + "', '" + data.lastName + "', '" + data.email + "');");
    pool.connect((error, postgresDB, done) => {
        if (error) {
            console.error("I got an error: " + error);
            response.status(500).send({ error });
        } else {
            postgresDB.query(
                'INSERT INTO "ACCOUNTS" VALUES (\'' + data.phoneNumber + "', '" + data.firstName + "', '" + data.lastName + "', '" + data.email + "');",
                (err, table) => {
                    done();
                    if (err) {
                        return res.send({ err });
                    } else {
                        return res.sendStatus(200);
                    }
                }
            )
        }
    });
}

const checkExistingAccount = (req, res) => {
    let pool = app.pool;
    let urlObj = url.parse(req.url, true);
    const email = urlObj.query.email;
    console.log('SELECT email FROM "ACCOUNTS" WHERE email = \'' + email + "';");
    pool.connect((error, postgresDB, done) => {
        if (error) {
            console.error("I got an error: " + error);
            response.status(500).send({ error });
        } else {
            postgresDB.query(
                'SELECT email FROM "ACCOUNTS" WHERE email = \'' + email + "';",
                (err, table) => {
                    done();
                    if (err) {
                        return res.send({ err });
                    } else {
                        return res.send(table.rows);
                    }
                }
            )
        }
    });
}


module.exports = {
    createAccount: createAccount,
    getUserData: getUserData,
    checkExistingAccount: checkExistingAccount
    // verifyPhoneNumber: verifyPhoneNumber,
};