const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


module.exports = (app) => {
    app.get('/', (req,res) => {
        request('https://www.nytimes.com/', (err,response,body) => {
            if(!err && response.statusCode == 200){
               var $ = cheerio.load(body);
               $('p.summary').each(function(i, element){
                   var desc = $(this);
                   console.log(desc.text())
               });
               
                // console.log(body)
            }
            res.send(body)
        })
        //res.sendFile(path.join(__dirname,'./../public/homepage.html'))
    })
}