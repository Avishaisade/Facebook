const { Router } = require('express');
const { User } = require('./user.model');

const route = Router();

// GET users from db
route.get('/users', async (req, res) => {
    try {
        res.send(await User.find({
            firstName: new RegExp(req.query, 'i')
        }));
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

route.get('/users/:id', async (req, res) => {
    try {
        res.send(await User.findById(req.params.id));
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// POST user to db
async function createUser(body) {
    const user = new User(body);
    await user.save();
    return user;
}
route.post('/users', async (req, res) => {
    try {
        res.send(await createUser(req.body));
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// DELETE
async function deleteUser(id) {
    return User.findByIdAndDelete(id);
}
route.delete('/users/:id', async (req, res) => {
    res.send(await deleteUser(req.params.id));
});

// PUT
async function updateUserById(id, body) {
    return User.findByIdAndUpdate(id, body);
}
route.put('/users/:id', async (req, res) => {
    try {
        res.send(await updateUserById(req.params.id, req.body));
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

// DONE >
module.exports = {
    route
};