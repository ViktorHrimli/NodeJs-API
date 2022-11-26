const { success, failed } = require("../../utils/codeResponse");
const { getContactById } = require("../../service/model");

const getContactsId = async (req, res) => {
  const id = req.params.contactId;
  const userId = await getContactById(id);
  if (!userId) return res.status(400).json(failed(400, "Not found"));

  res.status(200).json(success(200, userId));
};

module.exports = { getContactsId };
