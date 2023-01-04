const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const uploadPatchAvatar = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPatchAvatar);
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

module.exports = upload;
