const { success, failed } = require("../../utils/code");
const { listContacts } = require("../../service/model");

const errorMessage = "Not found";
const getContacts = async (req, res) => {
  try {
    const userList = await listContacts();
    if (!userList) return res.json(failed(400, errorMessage));

    res.json(success(200, userList));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

module.exports = { getContacts };
