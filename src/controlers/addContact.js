const { success, failed } = require("../../utils/codeResponse");
const { addContact } = require("../../service/model");

const postContacts = async (req, res) => {
  const body = req.body;
  const newUser = await addContact(body);
  if (!newUser) {
    return res.status(400).json(failed(400, "Not found user"));
  }

  res.status(201).json(success(201, newUser));
};

module.exports = { postContacts };
