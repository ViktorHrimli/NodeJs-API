const express = require("express");
const isValidId = require("../middlewars/isValid_Id");

const {
  deleteContacts,
  getContacts,
  getContactsId,
  postContacts,
  updateContacts,
  updateFavorite,
} = require("../controllers/contactsContorller");

const { wrapper } = require("../middlewars/wrapperValidation");

const router = express.Router();

router.get("/", wrapper(getContacts));

router.get("/:contactId", isValidId, wrapper(getContactsId));

router.post("/", wrapper(postContacts));

router.delete("/:contactId", isValidId, wrapper(deleteContacts));

router.put("/:contactId", isValidId, wrapper(updateContacts));

router.patch("/:contactId/favorite", isValidId, wrapper(updateFavorite));

module.exports = router;
