require('dotenv').config() // initializing .env variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoriesRoute = require('./store/categories/routes/route');
const usersRoute = require('./store/users/routes/route');
const path = require('path');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(express.json()); // eliminates the need for body-parser
app.use(cookieParser());

// used in production to serve client files
if(process.env.NODE_ENV === 'production') { // make sure that this actually works on prod
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}



const whitelist = ['http://localhost:8080'];
const corsOptions = {
  origin: (origin, callback) => {
    console.warn(origin)
    if (!origin || whitelist.indexOf(origin) !== -1) { // if origin is undefined it means that the request is made from this host
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
};

app.use('/api/categories', cors(corsOptions), categoriesRoute);
app.use('/api/users', cors(corsOptions), usersRoute);


app.get('/', cors(corsOptions),  (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.warn('host URL -', fullUrl, );
  console.warn('request origin -', req.get('origin'));
  res.cookie('JWT', '1234', {
    //maxAge: 86_400_000,
    httpOnly: true,
    //secure: true
  });
  console.log('Cookies: ', req.cookies)
 
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
   res.json({hoi: 'hoi'})
});

app.get('/getCookie', cors(corsOptions),  (req, res) => {
  console.log(' getCookie Cookies: ', req.cookies)
 
  // Cookies that have been signed
  console.log(' getCookie Signed Cookies: ', req.signedCookies)
 
   res.json({getCookie: 'getCookie'})
});

app.listen(port);

console.log('running on port: ' + port);
