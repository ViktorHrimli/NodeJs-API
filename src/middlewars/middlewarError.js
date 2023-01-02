const { MyNewError } = require("../helpers/ApiHandleError");

const errorhandler = (err, _, res) => {
  if (err instanceof MyNewError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
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
