const errorhandler = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

const error404 = (_, res, __) => {
  return res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts or /api/users",
    data: "Not found",
  });
};

module.exports = { errorhandler, error404 };
