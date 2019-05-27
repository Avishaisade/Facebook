const SERVER_URL = 'http://localhost:8080/';

export async function fetchPostById(id) {
    const post = await fetch(SERVER_URL + 'post/' + id);
    return await post.json();
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

export const createPost = (userId, token, post) => {
    return fetch(SERVER_URL + '/post/new/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(post)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};