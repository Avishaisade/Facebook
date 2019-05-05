export const create= (userId, token, post)=>{
    return fetch(`{process.env.REACT_APP_API_URL}/post/new/${userID}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: post
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err));
};


