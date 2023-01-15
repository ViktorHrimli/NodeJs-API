const code = require("./codeResponse");
const resize = require("./resizeImg");
const createEmailServices = require("./sendEmail");

module.exports = {
  code,
  createEmailServices,
  resize,
};
