const { success, failed } = require("../../utils/code");
const { addContact } = require("../../service/model");

const errorMessage = "Not found";

const postContacts = async (req, res) => {
  try {
    const body = req.body;
    const newUser = await addContact(body);
    res.json(success(201, newUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

module.exports = { postContacts };
