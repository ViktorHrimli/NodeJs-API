const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadDir = path.resolve("./public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");

    cb(null, `${uuidv4()}.${extension}`);
  },
  limits: {
    fileSize: process.env.SIZE_UPLOAD_IMG,
  },
});

const upload = multer({ storage });

const { postAvatars } = require("../controllers/avatarsContorller");

router.post("/upload", upload.single("avatar"), postAvatars);
router.use("/", express.static(uploadDir));

module.exports = router;
