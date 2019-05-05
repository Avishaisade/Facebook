const SERVER_URL = 'http://localhost:8080/';

export async function fetchUsers() {
	const users = await fetch(SERVER_URL + 'users');
	return await users.json();
}

export async function fetchSpecificUser(id) {
	const users = await fetch(SERVER_URL + 'user/' + id);
	return await users.json();
}

export async function createUser(user) {
	await fetch(SERVER_URL + 'users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});
}

export async function deleteUser(id) {
	await fetch(SERVER_URL + 'users/' + id, {
		method: 'DELETE',
	});
}