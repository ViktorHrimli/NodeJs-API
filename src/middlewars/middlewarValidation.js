const shemaBody = require("../helpers/validationContacts");
const userShema = require("../helpers/validationUser");
const { ValidationError } = require("../helpers/ApiHandleError");

const contactsWrap = (controller) => {
  return async (req, res, next) => {
    switch (req.method) {
      case "POST": {
        const { error } = shemaBody.postShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(new ValidationError(error.message));
      }
      case "GET": {
        return controller(req, res).catch(next);
      }
      case "PUT": {
        if (!req.body.name && !req.body.email && !req.body.phone) {
          return next(
            new ValidationError("Empty fields, please enter correct request")
          );
        }
        const { error } = shemaBody.putShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(new ValidationError(error.message));
      }
      case "PATCH": {
        const { error } = shemaBody.patchShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(new ValidationError(error.message));
      }
      default: {
        return controller(req, res).catch(next);
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
          ? controller(req, res).catch(next)
          : next(new ValidationError(error.message));
      }
      case "PATCH": {
        const { error } = userShema.patchUserShema.validate(req.body);

        return !error
          ? controller(req, res).catch(next)
          : next(new ValidationError(error.message));
      }
      default: {
        return controller(res, req, next).catch(next);
      }
    }
  };
};

module.exports = { contactsWrap, authWrapp };
