const { success } = require("../utils/codeResponse");
const { WrongParametrError } = require("../helpers/ApiHandleError");
const services = require("../services/contactsServices");

const getContacts = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const userList = await services.listContacts();
  if (!userList) {
    throw new WrongParametrError(`Not found user list`);
  }

  res.status(200).json(success(200, userList));
};

const getContactsId = async (req, res) => {
  const id = req.params.contactId;
  const userId = await services.getContactById(id);

  if (!userId) {
    throw new WrongParametrError(`Not found user id:${id}`);
  }

  res.status(200).json(success(200, userId));
};

const postContacts = async (req, res) => {
  const body = req.body;
  const newUser = await services.addContact(body);

  if (!newUser) {
    throw new WrongParametrError(`Not create new user`);
  }

  res.status(201).json(success(201, newUser));
};

const deleteContacts = async (req, res) => {
  const id = req.params.contactId;
  const removeUser = await services.removeContact(id);

  if (!removeUser) {
    throw new WrongParametrError(`Not found user id: ${id}`);
  }

  res.status(200).json(success(200, "contact deleted"));
};

const updateContacts = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const updateUser = await services.updateContact(id, body);

  if (!updateUser) {
    throw new WrongParametrError(`Not found user id: ${id}`);
  }

  res.status(200).json(success(200, updateUser));
};

const updateFavorite = async (req, res, next) => {
  const id = await req.params.contactId;
  const body = await req.body;

  const updateUser = await services.updateContact(id, body);

  if (!updateUser) {
    throw new WrongParametrError(`Not found user id: ${id}`);
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
