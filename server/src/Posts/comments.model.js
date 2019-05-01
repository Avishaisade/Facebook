const {model, Schema} = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const mongoosePaginate = require('mongoose-paginate');
const {User} = require('../users/user.model');

const CommentSchema = Schema({
	body: {
		type: String,
		required: true,
	},
	creationDate: {
		type: Date,
		default: Date.now,
	},
	like:{
        type: Number,
		required: true
	},  
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		autopopulate: true,
		required: true,
		validate: async (id) => {
			const user = await User.findById(id);
			if (user) return true;
			return false;
		}
	}
});

CommentSchema.plugin(autopopulate);

CommentSchema.plugin(mongoosePaginate);

const Comment = model('Comment', CommentSchema);

module.exports = {
	Comment
};