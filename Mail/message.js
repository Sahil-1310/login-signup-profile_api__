
var sgMail = require('@sendgrid/mail');

require('dotenv').config();
sgMail.setApiKey(process.env.API_KEY);
console.log(process.env.API_KEY)

async function sendEmail(payload) {
    const message = {
        to: payload.email,
        from: 'sahilkumar@apptunix.com',
        sub: 'Welcome to OnBoard',
        text: `Hey ${payload.firstname}`,
        html: '<h2>Succsessfully created Acoount</h2>'
    }
    sgMail.send(message).then(resolve => { console.log(resolve) }).catch(error => {
        console.log(error)
    });
}
exports.sendEmail = sendEmail;