const express = require("express");
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment,
    followingByUser
} = require("../controllers/posts");


const { requireSignin } = require("../controllers/auth");
const { userById, getFollowersByUserId } = require("../controllers/users");
const { createPostValidator } = require("../controllers/Validator");

const router = express.Router();

router.get("/posts", getPosts);

// like unlike
router.put("/posts/:postId/like", requireSignin, like);
router.put("/posts/:postId/unlike", requireSignin, unlike);

// comments
router.put("/posts/:postId/comment", requireSignin, comment);
router.put("/posts/:postId/uncomment", requireSignin, uncomment);

// post routes
router.post(
    "/posts/:userId",
    requireSignin,
    createPost,
    createPostValidator
);

router.get(
    "/users/:userId/following/posts", 
    requireSignin,
    // followingByUser
    postsByUser
    );

router.get("/users/:userId/posts", requireSignin, postsByUser);
router.get("/posts/:postId", singlePost);
router.put("/posts/:postId", requireSignin, isPoster, updatePost);
router.delete("/posts/:postId", requireSignin, isPoster, deletePost);
// photo
router.get("/posts/:postId/photo", photo);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// any route containing :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;