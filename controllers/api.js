module.exports = (app, Article) => {
    app.get('/api/articles', (req,res) => {
        Article.find().then(data=>{
            res.json(data)
        })
    })
}