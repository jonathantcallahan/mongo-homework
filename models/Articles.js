const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    author: String,
    desc: String,
    source: String,
    link: String,
    isFav: Boolean
})

const Article = mongoose.model('Articles', ArticleSchema);

module.exports = Article;