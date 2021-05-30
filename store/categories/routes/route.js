const express = require('express');
const ParseBody = require('../../core/middleWare/parseBody');
const router = express.Router();
const { find, create, deleteById, findById, deleteMany, update } = require('../controllers/controllers')
const bodyParser = new ParseBody({allowedFields: ['name', '_id']}); // don't worry about _id field when creating mongoDB wouldn't validate other ids

router.get('/', find);

// getting one element by passed param (id) in url
router.get('/:id', findById) 

// creating an element
router.post('/', bodyParser.checkFields, create); // using middleware for precation (don't want to create certain props from the body)

// updating an element
router.put('/', bodyParser.checkFields, update); // using middleware for precation (don't want to update certain props from the body)

// deleting one or many elements from request's body
router.delete('/', deleteMany);

// deleting one element by passed param (id) in url
router.delete('/:id', deleteById) 


module.exports = router;
