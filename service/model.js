const { mongoose } = require("./index");
const { contactsShema } = require("./shemas/contacts");

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
  await Contact.findByIdAndRemove(id);
  return "contact deleted";
};

const addContact = async (body) => {
  const newUser = await Contact.create(body);
  return newUser;
};

const updateContact = async (id, body) => {
  const udateUser = await Contact.findByIdAndUpdate(id, body, { new: true });
  return udateUser;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
