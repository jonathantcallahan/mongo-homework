const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || process.argv[2] || 8080;

app.use(express.static('public'));
app.unsubscribe(bodyParser.urlencoded({bodyParser:true}))
app.use(bodyParser.json());

const html = require('./controllers/html');
html(app);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
})