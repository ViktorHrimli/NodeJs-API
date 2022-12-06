const shemaBody = require("../helpers/validation");
const { failed } = require("../utils/codeResponse");

const wrapper = (controller) => {
  return async (req, res, next) => {
    switch (req.method) {
      case "POST": {
        const { error } = shemaBody.postShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json(failed(400, error.message)));
      }
      case "GET": {
        return controller(req, res).catch(next);
      }
      case "PUT": {
        if (!req.body.name && !req.body.email && !req.body.phone) {
          console.log("wtf");
          return next(
            res
              .status(400)
              .json(failed(400, "Empty fields, please enter correct request"))
          );
        }
        const { error } = shemaBody.putShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json(failed(400, error.message)));
      }
      case "PATCH": {
        const { error } = shemaBody.patchShema.validate(req.body);

        return !error
          ? controller(req, res)
          : next(res.status(400).json(failed(400, error.message)));
      }
      default: {
        return controller(req, res).catch(next);
      }
    }
  };
};

module.exports = { wrapper };
