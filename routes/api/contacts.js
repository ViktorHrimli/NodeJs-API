const express = require("express");
const { success, failed } = require("./code");
const { validationShema, validationPutShema } = require("./validationShema");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
const errorMessage = "Not found";

router.get("/", async (req, res, next) => {
  try {
    const userList = await listContacts();

    if (!userList) return res.json(failed(400, errorMessage));

    res.json(success(200, userList));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const userId = await getContactById(id);
    if (!userId) return res.json(failed(400, errorMessage));

    res.json(success(200, userId));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = validationShema.validate({
      name,
      email,
      phone,
    });

    if (error) return res.json(failed(400, error.message));
    const newUser = await addContact(name, email, phone);

    res.json(success(201, newUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const removeUser = await removeContact(id);

    res.json(success(200, removeUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const { error } = validationPutShema.validate({
      name: body.name,
      email: body.email,
      phone: body.phone,
    });

    if (error) return res.json(failed(400, error.message));

    const updateUser = await updateContact(id, body);

    res.json(success(200, updateUser));
  } catch (error) {
    res.json(failed(404, errorMessage));
  }
});

module.exports = router;
