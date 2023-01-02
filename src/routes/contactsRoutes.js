const express = require("express");
const isValidId = require("../middlewars/middlewarValid_Id");
const authMiddlewar = require("../middlewars/middlewarAuthToken");

const {
  deleteContacts,
  getContacts,
  getContactsId,
  postContacts,
  updateContacts,
  updateFavorite,
} = require("../controllers/contactsContorller");

const { contactsWrap } = require("../middlewars/middlewarValidation");

const router = express.Router();

router.use(authMiddlewar);

router.get("/", contactsWrap(getContacts));

router.get("/:contactId", isValidId, contactsWrap(getContactsId));

router.post("/", contactsWrap(postContacts));

router.delete("/:contactId", isValidId, contactsWrap(deleteContacts));

router.put("/:contactId", isValidId, contactsWrap(updateContacts));

router.patch("/:contactId/favorite", isValidId, contactsWrap(updateFavorite));

module.exports = router;
