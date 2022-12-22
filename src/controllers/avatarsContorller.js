const postAvatars = async (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "Файл успешно загружен",
    id: req.file.filename,
  });
};

const getAvatars = async (req, res, next) => {
  if (!req.file.filename) {
    res.status(400).json({ message: "Empty field", status: "filed" });
  }
  res.status(200).json({
    status: "success",
    id: req.file.filename,
  });
};

module.exports = {
  postAvatars,
  getAvatars,
};
