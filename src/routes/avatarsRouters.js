const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "avatars");

console.log(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: process.env.SIZE_UPLOAD_IMG,
  },
});

const { postAvatars } = require("../controllers/avatarsContorller");

router.post("avatars/", postAvatars);

module.exports = router;
