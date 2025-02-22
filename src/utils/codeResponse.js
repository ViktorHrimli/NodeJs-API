const success = (code, data) => {
  return { status: "success", code, data };
};

const failed = (code, message) => {
  return {
    status: "failed",
    code,
    ResponseBody: message,
  };
};

module.exports = { success, failed };
