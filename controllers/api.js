const mongoose = require('mongoose')

module.exports = (app, Article, Comment) => {
    app.get('/api/articles', (req,res) => {
        Article.find().then(data=>{
            res.json(data)
        })
    })

    app.post('/api/comments', (req,res) => {
        console.log('request recieved')
        // var data = new Comment({
        //     comment: req.body.comment,
        //     artid: req.body.artid
        // })
        var id = req.body.artid;
        console.log(id)
        Comment.create(req.body)
            .then(comment => {
                console.log(id)
                Article.findOneAndUpdate({_id:id},
                    { $push: {comments: comment._id} }, {new: true}
                )
            })
            .then(data => {
                console.log('data from after art comment: ' + data);
                res.end()
            });
        //data.save()
        // res.end()
    })

    app.get('/api/comments/:id', (req,res) => {

        Comment
            .find({artid:req.params.id})
            .then(data => {
                console.log(data);
                res.json(data)
            })
    })
    
    app.delete('/api/comments/:id', (req,res) => {
        console.log('delete request recieved')
        Comment.remove({_id:req.params.id}, err => {
            if(err) throw err;
            res.end()
        })
    })
}