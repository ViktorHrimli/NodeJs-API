const { success, failed } = require("../../utils/code");
const { updateContact } = require("../../service/model");

const errorMessage = "Not found";

const updateContacts = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const updateUser = await updateContact(id, body);

    res.json(success(200, updateUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

module.exports = { updateContacts };
