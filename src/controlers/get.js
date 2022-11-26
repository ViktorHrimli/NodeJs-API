const { success, failed } = require("../../utils/codeResponse");
const { listContacts } = require("../../service/model");

const getContacts = async (req, res) => {
  const userList = await listContacts();
  if (!userList) return res.json.status(400).json(failed(400, "Not found"));

  res.status(200).json(success(200, userList));
};

module.exports = { getContacts };
