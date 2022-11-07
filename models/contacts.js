const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const getUserList = async () => JSON.parse(await fs.readFile(contactsPath));

const listContacts = async () => {
  const list = await getUserList();
  return list;
};

const getContactById = async (contactId) => {
  const list = await getUserList();
  const user = list.find((item) => item.id === contactId);
  return user;
};

const removeContact = async (contactId) => {
  const list = await getUserList();
  const removeUser = list.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(removeUser));
  return "contact deleted";
};

const addContact = async (name, email, phone) => {
  const list = await getUserList();

  const newUser = {
    id: String(list.length + 1),
    name,
    email,
    phone,
  };
  list.push(newUser);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newUser;
};

const updateContact = async (contactId, body) => {
  const index = Number(contactId - 1);
  const list = await getUserList();

  list.reduce((_, item, indx, arr) => {
    if (item.id !== contactId) return item;

    arr.splice(indx, 1, { ...item, ...body });
    return arr;
  }, []);

  await fs.writeFile(contactsPath, JSON.stringify(list));
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
