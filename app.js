require('dotenv').config() // initializing .env variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoriesRoute = require('./store/categories/routes/route');
const usersRoute = require('./store/users/routes/route');
const path = require('path');
const port = process.env.PORT || 8080;

mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(express.json()); // eliminates the need for body-parser

// used in production to serve client files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.use('/categories', categoriesRoute)
app.use('/users', usersRoute)

app.get('/',  (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.warn(fullUrl)
})

app.listen(port);

console.log('running on port: ' + port);
