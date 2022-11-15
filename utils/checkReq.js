const { validationPutShema, validationShema } = require("./validationShema");

const validatePutReq = async (body) => {
  let inValid = true;
  if (!body.name && !body.email && !body.phone) return (inValid = null);

  const { error } = validationPutShema.validate({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });

  inValid = error ? null : true;

  return inValid;
};

const validatePostReq = async (body) => {
  const { error } = validationShema.validate({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });

  if (!error) return;
  return error;
};

module.exports = {
  validatePutReq,
  validatePostReq,
};
