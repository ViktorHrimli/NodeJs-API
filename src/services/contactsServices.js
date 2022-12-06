const mongoose = require("../db/index");
const contactsShema = require("../db/contacts/model");

const Contact = mongoose.model("contact", contactsShema);

const getUserList = async () => await Contact.find({}, "-createdAt -updatedAt");

const listContacts = async () => {
  const list = await getUserList();
  return list;
};

const getContactById = async (id) => {
  const user = await Contact.findById(id, "-createdAt -updatedAt");
  return user;
};

const removeContact = async (id) => {
  const removeUser = await Contact.findByIdAndRemove(id);
  return removeUser;
};

const addContact = async (body) => {
  const newUser = await Contact.create(body);
  return newUser;
};

const updateContact = async (id, body) => {
  const udateUser = await Contact.findByIdAndUpdate(id, body, { new: true });
  return udateUser;
};

const services = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = services;
