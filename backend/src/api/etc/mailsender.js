const nodemailer = require('nodemailer')

const mailSender = process.env.NM_SERVICE? nodemailer.createTransport({
    service: process.env.NM_SERVICE,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PSWD,
    },
}) : null

module.exports = { mailSender }