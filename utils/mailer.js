// mailer.js
const user = {
    email: 'Genji.Tapia@students.makeschool.com',
    name: 'Genji'
};

// require our mailgun dependencies
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
// auth with our mailgun API key and domain
const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.EMAIL_DOMAIN
    }
}
// create a mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// SEND EMAIL
module.exports.sendMail = ({user, petId}, req, res) => {
    // send an email to the user's email with a provided template
    nodemailerMailgun.sendMail({
        from: 'no-reply@example.com',
        to: user.email, // An array if you have multiple recipients.
        subject: 'Pet Purchased!',
        template: {
            name: 'email.handlebars',
            engine: 'handlebars',
            context: user
        }
    // mail sent, redirect to purchase page
    }).then(info => {
        console.log('Response: ' + info);
        res.redirect(`/pets/${petId}`);
        // catch errosr and redirect regardless
    }).catch(err => {
        console.log('Error: ' + err);
        res.redirect(`/pets/${petId}`);
    });
}