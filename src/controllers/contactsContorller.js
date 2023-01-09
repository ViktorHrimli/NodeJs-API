const {
  code: { success },
} = require("../utils");
const services = require("../services/contactsServices");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  const userList = await services.listContacts(
    owner,
    Number(page),
    Number(limit),
    favorite
  );

  if (!userList) {
    return res.status(400).json({ message: `Not found user contacts (:` });
  }

  res.status(200).json(success(200, userList));
};

const getContactsId = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;

  const user = await services.getContactById(id, owner);

  if (!user) {
    return res.status(400).json({ message: `Not found user id: '${id}'` });
  }

  res.status(200).json(success(200, user));
};

const postContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;

  const newUser = await services.addContact({
    name,
    email,
    phone,
    owner,
  });

  if (!newUser) {
    return res.status(400).json({ message: `Email in use` });
  }

  res.status(201).json(success(201, newUser));
};

const deleteContacts = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;

  const removeUser = await services.removeContact(id, owner);

  if (!removeUser) {
    return res.status(400).json({ message: `Not found user id: '${id}'` });
  }

  res.status(200).json(success(200, "contact deleted"));
};

const updateContacts = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;

  const updateUser = await services.updateContact(id, owner, req.body);

  if (!updateUser) {
    return res.status(400).json({ message: `Not found user id: '${id}'` });
  }

  res.status(200).json(success(200, updateUser));
};

const updateFavorite = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;

  const updateUser = await services.updateContact(id, owner, req.body);

  if (!updateUser) {
    return res.status(400).json({ message: `Not found user id: ${id}` });
  }

  res.status(200).json(success(200, updateUser));
};

module.exports = {
  getContacts,
  getContactsId,
  postContacts,
  deleteContacts,
  updateContacts,
  updateFavorite,
};
