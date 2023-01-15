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
  const emailOptions = {
    from: MY_EMAIL,
    subject: "Nodemailer test",
    html: `<Button style="padding: 15px; border-radius: 8px; background-color: blueviolet; cursor: pointer;" >Press on confirm email <a style="color: #fff;" href=${HOST}:${PORT}/api/users/verify/${token}>${userEmail}</a></Button>`,
  };
  try {
    await transporter.sendMail({ ...emailOptions, to: userEmail });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createEmailServices;
