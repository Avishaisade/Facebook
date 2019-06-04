const _ = require("lodash");
const User = require("../models/users.model");
const formidable = require("formidable");
const fs = require("fs");
// const postsByUser = require("../models/users.model");

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .populate("friends", "_id name")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user; 
            next();
        });
};

async function getUsers(query) {
	return User.find({
		name: new RegExp(query, 'i')
	});
}
    exports.searchUser=  async (req, res) => {
        try {
            const users = await getUsers(req.query);
            res.send(users);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    }


exports.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role === "admin";

    const authorized = sameUser || adminUser;

    // console.log("req.profile ", req.profile, " req.auth ", req.auth);
    console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    }
    next();
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("name email updated created role");
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }
        let user = req.profile;
        // console.log("user in update: ", user);
        user = _.extend(user, fields);

        user.updated = Date.now();
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            // console.log("user after update with formdata: ", user);
            res.json(user);
        });
    });
};

exports.userCoverPhoto = (req, res, next) => {
    if (req.profile.coverPhoto.data) {
        res.set(("Content-Type", req.profile.coverPhoto.contentType));
        return res.send(req.profile.coverPhoto.data);
    }
    next();
};

exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set(("Content-Type", req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
};

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ message: "User deleted successfully" });
    });
};
exports.addFriend = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $push: { friends: req.body.friendId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        }
    );
};

exports.addToFriend = (req, res) => {
    User.findByIdAndUpdate(
        req.body.friendId,
        { $push: { friends: req.body.userId } },
        { new: true }
    )
        .populate("friends", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // result.hashed_password = undefined;
            // result.salt = undefined;
            res.json(result);
        });
};

exports.removefriends = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { friends: req.body.unfriendId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        }
    );
};

exports.removeFromFriend = (req, res) => {
    User.findByIdAndUpdate(
        req.body.unfriendId,
        { $pull: { friends: req.body.userId } },
        { new: true }
    )
        .populate("friends", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

exports.findPeople = (req, res) => {
    let friends = req.profile.friends;
    friends.push(req.profile._id);
    User.find({ _id: { $nin: friends } }, (err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("name");
};

