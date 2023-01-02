const {
  contactValidation: { patchShema, postShema, putShema },
} = require("../db/contacts/model");

const {
  userValidation: { patchUserShema, postUserShema },
} = require("../db/user/model");

const { HttpError } = require("../helpers");

const contactsWrap = (controller) => {
  return async (req, res, next) => {
    switch (req.method) {
      case "POST": {
        const { error } = postShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(HttpError(400, error.message));
      }
      case "GET": {
        return controller(req, res);
      }
      case "PUT": {
        if (!req.body.name && !req.body.email && !req.body.phone) {
          return next(
            HttpError(400, "Empty fields, please enter correct request")
          );
        }
        const { error } = putShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(HttpError(400, error.message));
      }
      case "PATCH": {
        const { error } = patchShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(HttpError(400, error.message));
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
        const { error } = postUserShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(HttpError(400, error.message));
      }
      case "PATCH": {
        const { error } = patchUserShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(HttpError(400, error.message));
      }
      default: {
        return controller(res, req, next);
      }
    }
  };
};

module.exports = { contactsWrap, authWrapp };
