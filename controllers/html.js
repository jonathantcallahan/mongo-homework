const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/news')
const Schema = mongoose.Schema;
const userDataSchema = new Schema({
    title: String,
    author: String,
    desc: String
})

var Article = mongoose.model('Articles',userDataSchema)

module.exports = (app) => {
    app.get('/', (req,res) => {
        request('https://www.nytimes.com/', (err,response,body) => {
            if(!err && response.statusCode == 200){

               var $ = cheerio.load(body);

               $('h2.story-heading').each(function(i, element){
                    
                    var h2 = $(this)
                    let title = h2.children().text().trim();
                    let by = h2.next().next().text().trim();
                    let desc = h2.next().next().next().text().trim();
                    
                    
                    if(by.indexOf('By') >= 0){

                        var story = {
                            title: title,
                            author: by,
                            desc: desc
                        }

                        console.log(story)

                        var data = new Article(story)
                        data.save()
                    }
               });
            }
            res.sendFile(path.join(__dirname, './../public/homepage.html'))
        })
    })
}