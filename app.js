const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Post = require('./models/post');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	'/javascripts',
	express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.get('/create', (req, res) => {
	res.render('create');
});

app.get('/find', (req, res) => {
	res.render('find');
});

app.post('/', (req, res) => {
	Post.find({ title: { $regex: req.body.title, $options: 'i' } })
		.exec()
		.then(posts => {
			res.render('find', { data: posts });
		});
});
app.post('/create', (req, res) => {
	Post.create({
		title: req.body.title,
	});
	res.redirect('/create');
});

module.exports = app;
