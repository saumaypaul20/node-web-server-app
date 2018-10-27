const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res) => {
//     res.render('./partials/maintain.hbs');
// });

app.use((req, res, next) => {
    
    var now = new Date().toDateString(); 
    var log =`${now}: ${req.method} ${req.url} \n`;
    
    console.log(log);
    fs.appendFile('logger.log', log, (err) => {
        if(err){
            console.log('Unable to Append log to logger.log');
        }
    });
    next();
});



app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamit', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        heading: 'Home',
        msg: 'Welcome to Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',    
        msg:'Welcome to Express Practice Page!'
    });
});

app.get('/projects', (req, res) => {
    res.render('about.hbs', {
        title: 'Projects',    
        msgauthor:'Saumay Paul'
    });
});

app.listen(port, () =>{
    console.log(`Server is up on PORT ${port}`);
});