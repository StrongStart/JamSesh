const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const users = {
  marina: 'mmarina@vt.edu',
  jacques: 'jmetevier@gmail.com',
  david: 'liveoakplumbers@gmail.com',
  Roux: 'marinamcgrath92@gmail.com',
};

exports.sendEmailConfirmation = functions.database.ref('/messages/{uid}').onWrite(event => {
  const toUser = event.params.uid;
  const toUserEmail = users[toUser];
  const mailOptions = {
    from: '"JamSesh" <JamSesh@noreply.com>',
    to: toUserEmail,
  };
  mailOptions.subject = `Hi jamsesh user ${toUser}`;
  mailOptions.text = 'you have a new message on jamesh';
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New unsubscription confirmation email sent to:', toUserEmail);
  }).catch(error => {
    console.error('There was an error while sending the email:', error);
  });
});
