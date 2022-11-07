const success = (code, data) => {
  return { status: "success", code, data };
};

const failed = (code, message) => {
  return {
    status: "failed",
    code,
    message: `Field ${message}`,
    data: "Not found",
  };
};

module.exports = { success, failed };
