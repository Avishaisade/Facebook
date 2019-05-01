const { Router } = require('express');

const {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
} = require('./user');

const {
	getPostsByUserId,
	createPost
} = require('../Posts/posts');

const route = Router();

route.get   ('/users',      async (req, res) => {
	try {
		const users = await getUsers(req.query);
		res.send(users);
	} catch (e) {
		res.status(400);
		res.send(e.message);
	}
});

route.post  ('/users',      async (req, res) => {
	try {
		const user = await createUser(req.body);
		res.send(user);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

route.get   ('/users/:id',  async (req, res) => {
	try {
		const user = await getUserById(req.params.id);
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

route.delete('/users/:id',  async (req, res) => {
	try {
		const user = await deleteUser(req.params.id);
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

route.put   ('/users/:id',  async (req, res) => {
	try {
		const user = await updateUserById(req.params.id, req.body);
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

route.get   ('/users/:id/posts', async (req, res) => {
	const posts = await getPostsByUserId(req.params.id);
	res.send(posts);
});

route.post  ('/users/:id/posts', async (req, res) => {
	try {
		const post = {
			...req.body,
			userId: req.params.id,
		};

		const posts = await createPost(post);

		res.send(posts);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = {
	route
};







