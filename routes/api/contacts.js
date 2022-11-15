const express = require("express");
const {
  getContacts,
  getContactsId,
  postContacts,
  deleteContacts,
  updateContacts,
} = require("../../src/controlers/contactsController");
const {
  postVaidation,
  putVaidation,
} = require("../../src/middlewear/validation");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactsId);
router.post("/", postVaidation, postContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", putVaidation, updateContacts);

module.exports = router;
