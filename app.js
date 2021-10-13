const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const data = {
    id: 'Create',
    name: 'this is name',
}
const arr = ['one', 'two', 'sex']
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.render('index.ejs', { data: arr }))
app.get('/create', (req, res) => res.render('create.ejs'))
app.post('/create', (req, res) => {
    arr.push(req.body.text)
    res.render('index.ejs', { data: arr })
})

module.exports = app
