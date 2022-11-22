const { success, failed } = require("../../utils/code");
const { removeContact } = require("../../service/model");

const errorMessage = "Not found";

const deleteContacts = async (req, res) => {
  try {
    const id = req.params.contactId;
    const removeUser = await removeContact(id);

    res.status(200).json(success(200, removeUser));
  } catch (error) {
    res.status(404).json(failed(404, errorMessage));
  }
};

module.exports = { deleteContacts };
