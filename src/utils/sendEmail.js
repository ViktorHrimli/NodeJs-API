const nodemailer = require("nodemailer");

const { MY_EMAIL, HOST, PORT, PASSWORD_META_UA } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: MY_EMAIL,
    pass: PASSWORD_META_UA,
  },
};

const transporter = nodemailer.createTransport(config);

const createEmailServices = async (userEmail, token) => {
  console.log(token);
  const emailOptions = {
    from: MY_EMAIL,
    subject: "Nodemailer test",
    html: `<strong>CLick <a href=${HOST}:${PORT}/api/users/verify/${token}>link</a> to verify your email</strong>`,
  };
  try {
    await transporter.sendMail({ ...emailOptions, to: userEmail });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createEmailServices;
