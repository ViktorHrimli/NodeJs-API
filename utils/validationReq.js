const { shemaBody } = require("../service/shemas/requestShema");

const isValidPutReq = async (body) => {
  let inValid = true;
  if (!body.name && !body.email && !body.phone) {
    return (inValid = null);
  }

  const { error } = shemaBody.putShema.validate({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });

  inValid = error ? null : true;

  return inValid;
};

const isValidPostReq = async (body) => {
  const { error } = shemaBody.postShema.validate({
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  });

  if (!error) return;
  return error;
};

const isValidPatchReq = async (body) => {
  const { error } = shemaBody.patchShema.validate({
    favorite: body.favorite,
  });

  if (!error) return;
  return error;
};

module.exports = {
  isValidPutReq,
  isValidPostReq,
  isValidPatchReq,
};
