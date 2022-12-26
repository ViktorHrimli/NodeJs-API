const jwt = require("jsonwebtoken");
const { authSignUp } = require("../src/controllers/authController");

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

discribe("sign up test ", () => {
  test("should return ", () => {
    const fakeReq = {
      body: {
        email: "test@gmail.com",
        subscription: "starter",
      },
    };
    const fakeRes = {
      status: 200,
      json: { message: "" },
    };

    const fakeNext = jest.fn();

    expect(authSignUp(fakeReq, fakeRes, fakeNext)).toEqual(fakeRes.status);

    expect(authSignUp(fakeReq, fakeRes, fakeNext)).toEqual(token);

    expect(authSignUp(fakeReq, fakeRes, fakeNext)).toEqual({
      email: "test@gmail.com",
      subscription: "starter",
    });
  });
});
