const { success, failed } = require("../../utils/code");
const { getContactById } = require("../../service/model");

const errorMessage = "Not found";

const getContactsId = async (req, res) => {
  try {
    const id = req.params.contactId;
    const userId = await getContactById(id);
    if (!userId) return res.json(failed(400, errorMessage));

    res.json(success(200, userId));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

module.exports = { getContactsId };
