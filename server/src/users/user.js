const {User} = require('./user.model');

async function getUsers(query) {
	return User.find({
		name: new RegExp(query, 'i')
	});
}

async function createUser(userData) {
	const user = new User(userData);
	await user.save();
	return user;
}

async function getUserById(id) {
	return User.findById(id);
}

async function deleteUser(id) {
	return User.findByIdAndDelete(id);
}

async function updateUserById(id, user) {
	return User.findByIdAndUpdate(id, user);
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
};
