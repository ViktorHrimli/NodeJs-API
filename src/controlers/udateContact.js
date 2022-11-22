const { success, failed } = require("../../utils/code");
const { updateContact } = require("../../service/model");

const errorMessage = "Not found";

const updateContacts = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const updateUser = await updateContact(id, body);

    res.status(200).json(success(200, updateUser));
  } catch (error) {
    res.status(404).json(failed(404, errorMessage));
  }
};

module.exports = { updateContacts };
