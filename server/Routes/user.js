const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFriend,
    addFollower,
    removeFriend,
    removeFollower,
    findPeople,
    hasAuthorization
} = require("../controllers/users");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.put("/user/friends", requireSignin, addFriend, addFollower);
router.put("/user/unfriends", requireSignin, removeFriend, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
router.get("/user/photo/:userId", userPhoto);

// who to follow
router.get("/user/findpeople/:userId", requireSignin, findPeople);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;