const { Router } = require('express');
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userCoverPhoto,
    userPhoto,
    addFriend,
    addFollower,
    removeFriend,
    removeFollower,
    findPeople,
    hasAuthorization
} = require("../controllers/users");
const { requireSignin } = require("../controllers/auth");

const route = Router();


route.put("/user/friends", requireSignin, addFriend, addFollower);
route.put("/user/unfriends", requireSignin, removeFriend, removeFollower);

route.get("/users", allUsers);
route.get("/user/:userId", getUser);
route.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
route.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
route.get("/user/photo/:userId", userPhoto);
route.get("/user/coverPhoto/:userId", userCoverPhoto);

// who to follow
route.get("/user/findpeople/:userId", requireSignin, findPeople);

// any route containing :userId, our app will first execute userByID()
route.param("userId", userById);

module.exports = route;