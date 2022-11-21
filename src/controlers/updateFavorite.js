const { success, failed } = require("../../utils/code");
const { updateContact } = require("../../service/model");

const errorMessage = "Not found";

const updateFavorite = async (req, res, next) => {
  try {
    const id = await req.params.contactId;
    const body = await req.body;
    console.log(body);
    const updateUser = await updateContact(id, body);

    res.json(success(200, updateUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

module.exports = { updateFavorite };
