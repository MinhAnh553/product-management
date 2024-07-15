const nodemailer = require('nodemailer');
module.exports = (mailUser, title, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS_MAIL,
        },
    });

    const mailOptions = {
        from: process.env.MAIL,
        to: mailUser,
        subject: title,
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
        } else {
            // console.log('Email sent: ' + info.response);
        }
    });
};
