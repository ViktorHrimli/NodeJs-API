const { authSignUp } = require("../src/controllers/authController");

const User = require("../src/db/user/model");
const jwt = require("jsonwebtoken");
// context('when user with such email does not exist', () => {
// 			let newUser;

// 			before(async () => {});

// 			after(async () => {
// 				await userModel.findOneAndDelete({ email: newUser.body.user.email });
// 			});

// 			it('should return 201 Created', async () => {
// 				newUser = await request(server)
// 					.post('/api/auth/register')
// 					.set('Content-Type', 'application/json')
// 					.send({ email: 'new_email@gmail.com', password: 'some_password' })
// 					.expect(201);

// 				const responseBody = newUser.body;
// 				const createdUser = responseBody.should.have.property('user').which.is.a.Object();

// 				createdUser.obj.should.have.property('email').which.is.a.String();
// 				createdUser.obj.should.have.property('subscription').which.is.a.String();
// 				createdUser.obj.should.have.property('avatarURL').which.is.a.String();
// 				createdUser.obj.should.not.have.property('password');

// 				const existedUser = await userModel.findOne({ email: responseBody.user.email });

// 				should.exist(existedUser);
// 			});
// 		});
// 	});

describe("Service test post signup user ", () => {
  let newUser;

  it("should return 201 code", async (done) => {
    const fakeReq = {
      body: {
        email: "test@gmail.com",
        password: "hash-password",
        subscription: "starter",
      },
    };
    const fakeRes = {
      status: (code) => code,
      json: { message: "" },
    };

    const fakeNext = jest.fn();
    // jest.spyOn(User, "create").mockImplementationOnce(() => {});
    newUser = await authSignUp(fakeReq, fakeRes, fakeNext);

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
      process.env.SECRET_WORD
    );

    expect(newUser.token).toEqual(token);

    // expect(authSignUp(fakeReq, fakeRes, fakeNext)).toEqual(token);

    // expect(authSignUp(fakeReq, fakeRes, fakeNext)).toEqual({
    //   email: "test@gmail.com",
    //   subscription: "starter",
    // });

    done();
  });
});
