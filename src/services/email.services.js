//this file is responsible for setting up the email transporter using nodemailer and OAuth2 authentication with Gmail. It uses environment variables to securely store sensitive information like client ID, client secret, refresh token, and email user.
// It also includes a verification step to ensure that the connection to the email server is properly configured before sending any emails. The transporter is then exported for use in other parts of the application where email functionality is needed.
//in simple words, this code sets up a way to send emails from a Gmail account using nodemailer and OAuth2 authentication. It checks if the connection to the email server is working and then allows other parts of the application to use this setup to send emails.
//transporter is an object that allows you to send emails using the configured email service (in this case, Gmail) and authentication method (OAuth2). It is created using the nodemailer.createTransport() method, which takes an object with the service and authentication details as parameters. The transporter can then be used to send emails by calling its sendMail() method with the appropriate email options. it contact smtp server of gmail and send email to the user.

// bahut asan language me samja du toh , jab server ko kisi bhi email address me email bhejni hoti hai toh woh transporter ka user karta hai to communicate with email server (SMTP server) and send the email. Is code me humne transporter ko set up kiya hai using nodemailer and Gmail's OAuth2 authentication, jisse hum securely email bhej sakte hain without exposing our email credentials directly in the code.
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"VoltCore" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, userName) {
  const subject = 'Welcome to VoltCore!';
  const text = `Hi ${userName},\n\nThank you for registering with VoltCore. We're excited to have you on board! If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe VoltCore Team`;
    const html = `<p>Hi ${userName},</p><p>Thank you for registering with VoltCore. We're excited to have you on board! If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The VoltCore Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
};
