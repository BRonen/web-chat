const nodemailer = require('nodemailer')

const mailSender = nodemailer.createTransport({
    service: process.env.NM_SERVICE,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PSWD,
    },
})

module.exports = { mailSender }