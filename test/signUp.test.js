const app = require("../app");
const { authSignUp } = require("../src/controllers/authController");
const { User } = require("../src/db/user/model");
const mongoose = require("../src/db/index");

describe("Service test signup controller", () => {
  let newUser;
  const req = {
    body: {
      email: "test@gmail.com",
      password: "hash-password",
      subscription: "starter",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };

  const next = jest.fn();
  beforeAll(async () => {
    await mongoose
      .connect(process.env.URL_DB)
      .then(() => {
        app.listen(process.env.PORT || 3001, () => {
          console.log("Server running. Use our API on port: 3000");
        });
        console.log("Database connection successful");
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });

    newUser = await authSignUp(req, res, next);
  });

  afterAll(async () => {
    await User.findOneAndDelete({ email: "test@gmail.com" });
  });

  test("test by token", async () => {
    expect(typeof newUser.token).toBe("string");
  });

  test("test by email and subscribe", async () => {
    expect(newUser.user).toEqual({
      email: "test@gmail.com",
      subscription: "starter",
    });
  });

  test("test by response code 201", async () => {
    expect(res.status).toHaveBeenCalled();
  });
});
