const shemaBody = require("../helpers/validationContacts");
const userShema = require("../helpers/validationUser");

const contactsWrap = (controller) => {
  return async (req, res, next) => {
    switch (req.method) {
      case "POST": {
        const { error } = shemaBody.postShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json({ message: error.message }));
      }
      case "GET": {
        return controller(req, res);
      }
      case "PUT": {
        if (!req.body.name && !req.body.email && !req.body.phone) {
          return next(
            res
              .status(400)
              .json({ message: "Empty fields, please enter correct request" })
          );
        }
        const { error } = shemaBody.putShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json({ message: error.message }));
      }
      case "PATCH": {
        const { error } = shemaBody.patchShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json({ message: error.message }));
      }
      default: {
        return controller(req, res);
      }
    }
  };
};

const authWrapp = (controller) => {
  return async (req, res, next) => {
    switch (req.method) {
      case "POST": {
        const { error } = userShema.postUserShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json({ message: error.message }));
      }
      case "PATCH": {
        const { error } = userShema.patchUserShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json({ message: error.message }));
      }
      default: {
        return controller(res, req, next);
      }
    }
  };
};

module.exports = { contactsWrap, authWrapp };
