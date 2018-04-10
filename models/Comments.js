const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: String,
    artid: String
})

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment