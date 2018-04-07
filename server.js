const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/news'
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title: String,
    author: String,
    desc: String,
    source: String,
    link: String
})

const CommentSchema = new Schema({
    comment: String,
    artid: String
})

const Article = mongoose.model('Articles', ArticleSchema)
const Comment = mongoose.model('Comments', CommentSchema)

const PORT = process.env.PORT || process.argv[2] || 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const html = require('./controllers/html');
const api = require('./controllers/api');
html(app, Article);
api(app, Article, Comment);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
})