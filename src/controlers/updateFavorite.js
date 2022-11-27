const { success, failed } = require("../../utils/codeResponse");
const { updateContact } = require("../../service/model");

const updateFavorite = async (req, res, next) => {
  const id = await req.params.contactId;
  const body = await req.body;

  const updateUser = await updateContact(id, body);

  if (!updateUser) return res.status(400).json(failed(400, "Not found"));

  res.status(200).json(success(200, updateUser));
};

module.exports = { updateFavorite };
