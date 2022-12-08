const mongoose = require("../db/index");
const contactsShema = require("../db/contacts/model");

const Contact = mongoose.model("contact", contactsShema);
const options = {
  createdAt: 0,
};

const listContacts = async (owner, limit) => {
  return await Contact.find({ owner }, options).limit(limit);
};

const getContactById = async (id, userId) => {
  const user = await Contact.findById(id, options);
  return user;
};

const removeContact = async (id) => {
  const removeUser = await Contact.findByIdAndRemove(id);
  return removeUser;
};

const addContact = async (body) => {
  const newUser = await Contact.create(body, options);
  return newUser;
};

const updateContact = async (id, body) => {
  const udateUser = await Contact.findByIdAndUpdate(id, body, [
    { email: 1, subscription: 1 },
    { new: true },
  ]);
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
