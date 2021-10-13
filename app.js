const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const Post = require('./models/post')

console.log(Post.find({}))

const arr = ['one', 'two', 'sex']
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    Post.find({}).then((posts) => res.render('index.ejs', { data: posts }))
})
app.get('/create', (req, res) => res.render('create.ejs'))
app.post('/create', (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
    })
    res.redirect('/')
})

module.exports = app
