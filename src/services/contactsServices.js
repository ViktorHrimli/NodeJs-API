const { Contact } = require("../db/contacts/model");

const listContacts = async (owner, page = 1, limit = 20, favorite = 1) => {
  let count = 0;
  const skip = page > 1 ? (count = limit * page - limit) : count;

  return await Contact.find({ owner })
    .skip(skip)
    .limit(limit)
    .sort({ favorite: favorite === 1 ? 0 : -1 })
    .select({ createdAt: 0 });
};

const getContactById = async (id, owner) => {
  return await Contact.findOne({
    _id: id,
    owner,
  });
};

const removeContact = async (id, owner) => {
  return await Contact.findOneAndDelete({ _id: id, owner });
};

const addContact = async (body) => {
  // HACK, captured error unique email
  const { email } = body;
  const findUser = await Contact.findOne({ email });

  if (findUser) {
    return null;
  }

  return await Contact.create(body);
};

const updateContact = async (id, owner, body) => {
  // HACK return not uptdate data
  await Contact.findOneAndUpdate({ _id: id, owner }, body);

  return await Contact.findOne({ _id: id, owner });
};

const services = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = services;
