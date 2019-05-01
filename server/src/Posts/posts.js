const {Post} = require('./Posts.model');
const {Comment} = require('./comments.model');

async function getPosts(limit = 10, page = 1) {
	return Post.paginate({}, {limit, page});
}

async function createPost(postData) {
	const post = new Post(postData);
	await post.save();
	return post;
}

async function deletePost(id) {
	return Post.findByIdAndDelete(id);
}

async function getPostById(id) {
	return Post
		.findById(id)
		.populate('comments');
}

async function updatePostById(id, post) {
	return Post.findByIdAndUpdate(id, post);
}

async function getPostsByUserId(userId) {
	// ??
}

async function addComment(postId, commentData) {
	const post = await getPostById(postId);
	return post.createComment(commentData);
}

async function getCommentsByPost(postId, limit = 10, page = 1) {
	const post = await getPostById(postId);
	return Comment.paginate({
		_id: {
			$in: post.comments,
		}
	}, {limit, page});
}

module.exports = {
	getPosts,
	createPost,
	deletePost,
	getPostById,
	updatePostById,
	getPostsByUserId,
	addComment,
	getCommentsByPost,
};


