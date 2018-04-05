const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');


module.exports = (app, Article) => {
    
    function addToDb(story){
        Article.find({title:story.title}).then(entry=>{
            // console.log(entry)
            if(entry == undefined || entry.length == 0){
                console.log('entry did not exist, added to database')
                var data = new Article(story);
                data.save()
            } else {
                console.log('entry already existed, did not add to database')
            }
        })
    };

    function getNyt(){
        request('https://www.nytimes.com/', (err,response,body) => {
            if(!err && response.statusCode == 200){

               var $ = cheerio.load(body);

               $('h2.story-heading').each(function(i, element){
                    
                    var h2 = $(this)
                    let title = h2.children().text().trim();
                    let by = h2.next().next().text().trim();
                    let desc = h2.next().next().next().text().trim();
                    let link = h2.children().attr('href');
                    
                    if(by.indexOf('By') >= 0){

                        var story = {
                            title: title,
                            author: by,
                            desc: desc,
                            source: 'NYT',
                            link: link
                        }
                       // console.log(story)
                        addToDb(story)
                    }
               });
            }
          
        })
    };

    app.get('/', (req,res) => {
        getNyt()
        res.sendFile(path.join(__dirname, './../public/homepage.html'))
    })
}