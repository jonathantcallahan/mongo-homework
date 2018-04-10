const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Comment = require('./Comments')


const ArticleSchema = new Schema({
    title: String,
    author: String,
    desc: String,
    source: String,
    link: String,
    isFav: Boolean,
    comments: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Comment 
    }
})

const Article = mongoose.model('Articles', ArticleSchema);

module.exports = Article;