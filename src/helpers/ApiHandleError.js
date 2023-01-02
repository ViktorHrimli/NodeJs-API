class MyNewError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.message = message;
  }
}

class ValidationError extends MyNewError {
  constructor(message) {
    super(message);
    this.status = 400;
    this.message = message;
  }
}

class WrongParametrError extends MyNewError {
  constructor(message) {
    super(message);
    this.status = 400;
    this.message = message;
  }
}

class AutoraizedError extends MyNewError {
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = message;
  }
}

class ConflicktError extends MyNewError {
  constructor(message) {
    super(message);
    this.status = 409;
    this.message = message;
  }
}

module.exports = {
  ValidationError,
  WrongParametrError,
  AutoraizedError,
  MyNewError,
  ConflicktError,
};
