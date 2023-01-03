const express = require("express");

// shema valid
const {
  contactValidation: { patchShema, postShema, putShema },
} = require("../db/contacts/model");
//
const {
  deleteContacts,
  getContacts,
  getContactsId,
  postContacts,
  updateContacts,
  updateFavorite,
} = require("../controllers/contactsContorller");
// middlewars

const { isValidId, authToken, wrapper, validate } = require("../middlewars");

// routers

const router = express.Router();

router.use(authToken);

router.get("/", wrapper(getContacts));

router.get("/:contactId", isValidId, wrapper(getContactsId));

router.post("/", validate(postShema), wrapper(postContacts));

router.delete("/:contactId", isValidId, wrapper(deleteContacts));

router.put(
  "/:contactId",
  isValidId,
  validate(putShema),
  wrapper(updateContacts)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validate(patchShema),
  wrapper(updateFavorite)
);

module.exports = router;
