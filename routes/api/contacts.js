const express = require("express");
const isValidId = require("../../src/middlewear/isValid_Id");

const { getContacts } = require("../../src/controlers/get");
const { getContactsId } = require("../../src/controlers/getContact");
const { postContacts } = require("../../src/controlers/addContact");
const { deleteContacts } = require("../../src/controlers/deleteContact");
const { updateContacts } = require("../../src/controlers/udateContact");
const { updateFavorite } = require("../../src/controlers/updateFavorite");

const { wrapper } = require("../../src/middlewear/wrapperValidation");
const { asyncWrapper } = require("../../src/middlewear/asyncWrapper");

const router = express.Router();

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", isValidId, asyncWrapper(getContactsId));
router.post("/", wrapper(postContacts));
router.delete("/:contactId", isValidId, asyncWrapper(deleteContacts));
router.put("/:contactId", isValidId, wrapper(updateContacts));
router.patch("/:contactId/favorite", isValidId, wrapper(updateFavorite));

module.exports = router;
