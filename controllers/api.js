module.exports = (app, Article, Comment) => {
    app.get('/api/articles', (req,res) => {
        Article.find().then(data=>{
            res.json(data)
        })
    })

    app.post('/api/comments', (req,res) => {
        console.log('request recieved')
        var data = new Comment({
            comment: req.body.comment,
            artid: req.body.artid
        })
        data.save()
        res.end()
    })

    app.get('/api/comments/:id', (req,res) => {

        Comment
            .find({artid:req.params.id})
            .then(data => {
                console.log(data);
                res.json(data)
            })
    })
}