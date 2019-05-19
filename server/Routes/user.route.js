const { Router } = require('express');
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    userCoverPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
    hasAuthorization
} = require("../controllers/users");
const { requireSignin } = require("../controllers/auth");

const route = Router();


route.put("/user/follow", requireSignin, addFollowing, addFollower);
route.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

route.get("/users", allUsers);
route.get("/user/:userId", getUser);
route.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
route.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
route.get("/user/photo/:userId", userPhoto);
route.get("/user/coverPhoto/:userId", userCoverPhoto);

// find friends
route.get("/user/findpeople/:userId", requireSignin, findPeople);

// any route containing :userId, our app will first execute userByID()
route.param("userId", userById);

module.exports = route;

