const { success, failed } = require("../../utils/code");
const { listContacts } = require("../../service/model");

const errorMessage = "Not found";
const getContacts = async (req, res) => {
  try {
    const userList = await listContacts();
    if (!userList) return res.json(failed(400, errorMessage));

    res.status(200).json(success(200, userList));
  } catch (error) {
    res.status(404).json(failed(404, errorMessage));
  }
};

module.exports = { getContacts };
