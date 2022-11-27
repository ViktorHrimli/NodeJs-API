const { success, failed } = require("../../utils/codeResponse");
const { updateContact } = require("../../service/model");

const updateContacts = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const updateUser = await updateContact(id, body);

  if (!updateUser) return res.status(400).json(failed(400, "Not found"));

  res.status(200).json(success(200, updateUser));
};

module.exports = { updateContacts };
