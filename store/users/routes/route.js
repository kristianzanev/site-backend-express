const express = require('express');
const router = express.Router();
const { find, create, login, deleteById, findById, deleteMany, update } = require('../controllers/controllers');
const ParseBody = require('../../core/middleWare/parseBody');
const bodyParser = new ParseBody({allowedFields: ['name', 'password', 'email', '_id']}); // don't worry about _id field when creating mongoDB wouldn't validate other ids
const loginParser = new ParseBody({allowedFields: ['password', 'email']});


// getting all elements
router.get('/', find); // even crypted PASSWORDS shouldn't be public !!!!!

// getting one element by passed param (id) in url
router.get('/:id', findById) // even crypted PASSWORDS shouldn't be public !!!!!

// creating an element
router.post('/register', bodyParser.checkFields, create); // using middleware for precation (don't want to create certain props from the body)

router.post('/login', loginParser.checkFields, login); // using middleware for precation (don't want to create certain props from the body)

// updating an element
router.put('/', bodyParser.checkFields, update); // using middleware for precation (don't want to update certain props from the body)

// deleting one or many elements from request's body
router.delete('/', deleteMany);

// deleting one element by passed param (id) in url
router.delete('/:id', deleteById);


module.exports = router;
