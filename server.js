//here we declare the express module
const express = require('express');
//here we declare the hbs module
//this will allow us to render handlebars templates
const hbs = require('hbs');
//here we declare the filesystem module
const fs = require('fs');

//here we create a new app, by using the express method
let app = express();

//here we will delclare the reusable partials that will be able to
//to be used in several pages
hbs.registerPartials(__dirname + '/views/partials');
//her we setup express for handlebars
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  //here we declare a timestamp
  let now = new Date().toString();
  //here we pass the http request and url to a variable
  //as well as the timestamp
  let log = `${now}: ${req.method} ${req.url}`;

  //here we log out the log based on the home page
  console.log(log);
  //we also append the log to a server.log file
  //we also set up an error argument in case things go wrong
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.')
    }
  })
  next();
});

//here we set up a maintenance page without calling the next argument
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
//this should be commented out when the site is not under maintenance

//here we are setting a server in order to serve static pages
//the __dirname stores our directory name followed by the folder
//we wish to access
app.use(express.static(__dirname + '/public'));

//here we declare an hbs helper than will be able to be re-used everywhere
//similiar to a variable, instead of writing the function over and over again
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
//here we declare another hbs helper this will conver text passed into the
//helper into all capital letters
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// //here we will set up the http route handlers
// //setting up the get request
// //we set up two important arguments the
// //request argument and the response argument
// app.get('/', (req, res) => {
//   //here we call the respond/send argument with some html inside
//   //res.send('<h1>Hello Express</h1>');
//
// //this will be the root route
// //here we call the respond/send argument and we pass it some JSON data
//   res.send({
//     //here we declare JSON objects
//   name: 'Gerardo',
//   //here we declare a JSON array
//   likes:[
//          'Basketball',
//          'Cryptocurrency'
//         ]
//    });
// });

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome home!'
    //currentYear: new Date().getFullYear()
  });
});

//here we define another route
//forward slash is followed by any name
//similiar to name an html document
app.get('/about', (req, res) => {
  //res.send('About page');
  //here instead of sending the html page
  //we render the hbs template file
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});


//here we will define another route
//this route will be for when data is bad
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//and the app is being listened on local host por 3000
app.listen(3000, () => {
  //here we let the user know the server is up an running
  console.log('server is up on port:3000')
});
