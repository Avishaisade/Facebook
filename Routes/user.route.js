const { Router } = require('express');
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    userCoverPhoto,
    addFriend,
    addToFriend,
    removefriends,
    removeFromFriend, 
    findPeople,
    hasAuthorization,
    searchUser
} = require("../controllers/users");
const { requireSignin } = require("../controllers/auth");

const route = Router();


route.put("/users/:userId/friend", requireSignin, addFriend, addToFriend);
route.put("/users/:userId/unfriend", requireSignin, removefriends, removeFromFriend);

route.get("/users", allUsers);
route.get("/users/:userId", getUser);
route.put("/users/:userId", requireSignin, hasAuthorization, updateUser);
route.delete("/users/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
route.get("/users/:userId/photo", userPhoto);
route.get("/users/:userId/coverPhoto", userCoverPhoto);

// find friends 
route.get("/users/:userId/findpeople", requireSignin, findPeople);

// Search Users
route.get("/users/search/:query", searchUser);

// any route containing :userId, our app will first execute userByID()
route.param("userId", userById);

module.exports = route;

