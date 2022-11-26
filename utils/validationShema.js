const { shemaBody } = require("../service/shemas/requestShema");

const isValidPost = async (body) => {
  const { error } = shemaBody.postShema.validate({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
  if (error) return error;
  return null;
};

// const isValidPut = async (body) => {
//   if (!body.name && !body.email && !body.phone) {
//     return null;
//   }
//   const { error } = shemaBody.putShema.validate({
//     name: body.name,
//     email: body.email,
//     phone: body.phone,
//   });

//   if (!error) return true;
//   return null;
// };

// const isValidPatch = async (body) => {
//   let isValid = true;
//   const { error } = shemaBody.patchShema.validate({
//     favorite: body.favorite,
//   });

//   isValid = error ? null : true;
//   return isValid;
// };

module.exports = {
  isValidPost,
  // isValidPatch,
  // isValidPut,
};
