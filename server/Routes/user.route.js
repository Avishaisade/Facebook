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


route.put("/users/:userId/follow", requireSignin, addFollowing, addFollower);
route.put("/users/:userId/unfollow", requireSignin, removeFollowing, removeFollower);

route.get("/users", allUsers);
route.get("/users/:userId", getUser);
route.put("/users/:userId", requireSignin, hasAuthorization, updateUser);
route.delete("/users/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
route.get("/users/:userId/photo", userPhoto);
route.get("/users/:userId/coverPhoto", userCoverPhoto);

// find friends
route.get("/users/:userId/findpeople", requireSignin, findPeople);

// any route containing :userId, our app will first execute userByID()
route.param("userId", userById);

module.exports = route;

