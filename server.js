const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// app.use((req,res,next) => {
//    res.render('matin');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home', {
        pageTitle: 'Home',
        welcomeMessage: 'Hello and welcome to some website'
    });
});

app.get('/about', (req,res)=> {
   res.render('about', {
       pageTitle: 'About Page'
   });
});

app.get('/projects', (req,res) => {
    res.render('projects', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to fufill this request'
    });
});

app.use(express.static(__dirname + '/public'));


app.listen(port, () => {
    console.log('Server up on port ' + port);
});