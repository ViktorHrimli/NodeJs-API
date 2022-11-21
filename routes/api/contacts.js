const express = require("express");
const isValidId = require("../../src/middlewear/isValid_Id");

const { getContacts } = require("../../src/controlers/get");
const { getContactsId } = require("../../src/controlers/getContact");
const { postContacts } = require("../../src/controlers/addContact");
const { deleteContacts } = require("../../src/controlers/deleteContact");
const { updateContacts } = require("../../src/controlers/udateContact");
const { updateFavorite } = require("../../src/controlers/updateFavorite");

const {
  postVaidation,
  putVaidation,
  patchVaidation,
} = require("../../src/middlewear/validation");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", isValidId, getContactsId);
router.post("/", postVaidation, postContacts);
router.delete("/:contactId", isValidId, deleteContacts);
router.put("/:contactId", isValidId, putVaidation, updateContacts);
router.patch("/:contactId/favorite", isValidId, patchVaidation, updateFavorite);

module.exports = router;
