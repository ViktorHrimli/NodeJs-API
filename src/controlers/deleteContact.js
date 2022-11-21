const { success, failed } = require("../../utils/code");
const { removeContact } = require("../../service/model");

const errorMessage = "Not found";

const deleteContacts = async (req, res) => {
  try {
    const id = req.params.contactId;
    const removeUser = await removeContact(id);

    res.json(success(200, removeUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

module.exports = { deleteContacts };
