const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


module.exports = (app) => {
    app.get('/', (req,res) => {
        request('https://www.nytimes.com/', (err,response,body) => {
            if(!err && response.statusCode == 200){
               var $ = cheerio.load(body);
               $('div.collection').each(function(i, element){
                    var div = $(this)
                    var title = div.next().children().text();
                    var author = false;
                    var desc = div.next().next().next().text();
                    if(div.next().next().text().indexOf('By') >= 0){
                        author = div.next().next().text()
                    }
                    
                //    var desc = p.summary.text()
                if(author){
                    var story = {
                        title:title.replace(/(\n)/gm,'').trim(),
                        author:author.replace(/(\n)/gm,'').trim(),
                        desc:desc.replace(/(\n)/gm,"").trim()
                    }
                    console.log(story)
                }
                //   console.log(author.text().indexOf('By'))
                //   if(author.indexOf('By') >= 0){
                   //   console.log(title, desc, author) 
                //   }
                   
               });
               
                // console.log(body)
            }
            res.send(body)
        })
        //res.sendFile(path.join(__dirname,'./../public/homepage.html'))
    })
}