const { success, failed } = require("../../utils/code");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

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

const postContacts = async (req, res) => {
  try {
    const body = req.body;
    const newUser = await addContact(body);
    res.json(success(201, newUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

const deleteContacts = async (req, res) => {
  try {
    const id = req.params.contactId;
    const removeUser = await removeContact(id);

    res.json(success(200, removeUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
};

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

module.exports = {
  getContacts,
  getContactsId,
  postContacts,
  deleteContacts,
  updateContacts,
};
