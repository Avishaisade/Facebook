const SERVER_URL = 'http://localhost:8080';

export class UsersService {
	async fetchUsers() {
		const users = await fetch(SERVER_URL +'users');
		return await users.json();
	}

	async createUser(user) {
		await fetch(SERVER_URL +'users', {
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
	}

	async deleteUser(id) {
		await fetch(SERVER_URL +'users/' + id, {
			method: 'DELETE',
		});
	}
}