const { success, failed } = require("../../utils/codeResponse");
const { removeContact } = require("../../service/model");

const deleteContacts = async (req, res) => {
  const id = req.params.contactId;
  const removeUser = await removeContact(id);

  if (!removeUser) {
    res.status(400).json(failed(400, "User not found, enter correct id"));
  }

  res.status(200).json(success(200, "contact deleted"));
};

module.exports = { deleteContacts };
