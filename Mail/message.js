
var sgMail = require('@sendgrid/mail');

require('dotenv').config();
sgMail.setApiKey(process.env.API_KEY);

function sendEmail(payload) {
    const message = {
        to: payload.email,
        from: "sahilkumar@apptunix.com",
        subject: "Welcome to OnBoard",
        text: `Hey ${payload.firstname}`,
        html: '<h2>Succsessfully created Acoount</h2>'
    }
    sgMail.send(message).then(() => { console.log("Email Sent") }).catch(error => {
        console.log(error)
    });
}
exports.sendEmail = sendEmail;