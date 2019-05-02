const express = require("express");
const {
    signup,
    signin,
    signout,
    socialLogin
} = require("../controllers/auth");

// import password reset validator
const { userSignupValidator } = require("../controllers/Validator");
const { userById } = require("../controllers/users");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);


// then use this route for social login
router.post("/social-login", socialLogin);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;