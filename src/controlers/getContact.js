const { success, failed } = require("../../utils/code");
const { getContactById } = require("../../service/model");

const errorMessage = "Not found";

const getContactsId = async (req, res) => {
  try {
    const id = req.params.contactId;
    const userId = await getContactById(id);
    if (!userId) return res.json(failed(400, errorMessage));

    res.status(200).json(success(200, userId));
  } catch (error) {
    res.status(404).json(failed(404, errorMessage));
  }
};

module.exports = { getContactsId };
