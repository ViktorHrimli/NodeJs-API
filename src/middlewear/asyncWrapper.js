const asyncWrapper = (controller) => {
  return async (res, req, next) => {
    await controller(res, req).catch(next);
  };
};

module.exports = { asyncWrapper };
