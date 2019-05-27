const { Router } = require('express');

const {
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
    socialLogin
} = require("../controllers/auth");
const { userSignupValidator, passwordResetValidator } = require("../controllers/Validator");
const { userById } = require("../controllers/users");

const route = Router();

route.post("/signup", userSignupValidator, signup);
route.post("/signin", signin);
route.get("/signout", signout);

// password forgot and reset routes
route.put("/forgot-password", forgotPassword);
route.put("/reset-password", passwordResetValidator, resetPassword);

// then use this route for social login
route.post("/social-login", socialLogin);

// any route containing :userId, our app will first execute userByID()
route.param("userId", userById);

module.exports = route;

