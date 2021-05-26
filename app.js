require('dotenv').config() // initializing .env variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const categoriesRoute = require('./store/categories/routes/categories');
const dbURI = `mongodb+srv://Admin:${process.env.DATABASE_PASS}@cluster0.wiejv.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json()); // eliminates the need for body-parser
app.get('/', (req, res) => res.send('use /api/ in the beginning of url'));

// app.get('/api/categories', async (req, res) => {
//     try {
//         const categories = await Categories.find();
//         res.json(categories);
//     } catch(err) {
//         res.json({ stack: err.stack })
//     }
// })
app.use('/categories', categoriesRoute)

app.listen(3000);
console.log('running on 3000')
