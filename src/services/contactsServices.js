const mongoose = require("../db/index");
const contactsShema = require("../db/contacts/model");

const Contact = mongoose.model("contact", contactsShema);
const options = {
  createdAt: 0,
};

const listContacts = async (owner, page = 0, limit = 20, favorite = false) => {
  let count = 0;
  const skip = page > 0 ? (count += limit) : page;

  return await Contact.find({ owner }).skip(skip).limit(limit).select(options);
};

const getContactById = async (id, owner) => {
  return await Contact.findById(
    {
      _id: id,
      owner,
    },
    { runValidators: true }
  );
};

const removeContact = async (id, owner) => {
  return await Contact.findOneAndDelete({ _id: id, owner });
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (id, owner, body) => {
  return await Contact.findOneAndUpdate({ _id: id, owner }, body);
};

const services = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = services;
