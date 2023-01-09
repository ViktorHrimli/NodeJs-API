const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.EMAIL_KEY_SERVICE);

const createEmailServices = async (userEmail) => {
  console.log(process.env.EMAIL_KEY_SERVICE);
  const msg = {
    to: userEmail,
    from: "viktorhrimli101@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "Verify Email",
    html: "<strong>CLick link to verify your email</strong>",
  };

  return await sgMail
    .send(msg)
    .then((data) => console.log("Email success send"))
    .catch((error) => console.log(error.message));
};

module.exports = createEmailServices;
