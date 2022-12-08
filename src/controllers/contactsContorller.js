const { success } = require("../utils/codeResponse");
const { WrongParametrError } = require("../helpers/ApiHandleError");
const services = require("../services/contactsServices");

const getContacts = async (req, res) => {
  const { id } = await req.user;
  const { page, limit } = await req.query;
  console.log(page);
  console.log(req.user);
  const userList = await services.listContacts(id, limit);

  if (!userList) {
    throw new WrongParametrError(`Not found user list`);
  }

  res.status(200).json(success(200, userList));
};

const getContactsId = async (req, res) => {
  const contactsId = req.params.contactId;
  const { id } = req.user;

  const user = await services.getContactById(contactsId, id);

  if (!user) {
    throw new WrongParametrError(`Not found user id:${contactsId}`);
  }

  res.status(200).json(success(200, user));
};

const postContacts = async (req, res) => {
  const { id } = req.user;

  const newUser = await services.addContact({
    ...req.body,
    owner: id,
  });

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
  const updateUser = await services.updateContact(id, req.body);

  if (!updateUser) {
    throw new WrongParametrError(`Not found user id: ${id}`);
  }

  res.status(200).json(success(200, updateUser));
};

const updateFavorite = async (req, res, next) => {
  const id = await req.params.contactId;

  const updateUser = await services.updateContact(id, req.body);

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
