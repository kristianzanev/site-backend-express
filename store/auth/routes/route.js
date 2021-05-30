const express = require('express');
const router = express.Router();
const { find, create, deleteById, findById, deleteMany, update } = require('../controllers/controllers')

const filterReqBody = (req, res, next) => {
    req.body.filtered = {
        name: req.body.name,
    }
    next()
}
// getting all elements
router.get('/', find);

// getting one element by passed param (id) in url
router.get('/:id', findById) 

// creating an element
router.post('/', filterReqBody, create); // using middleware for precation (don't want to create certain props from the body)

// updating an element
router.put('/', filterReqBody, update); // using middleware for precation (don't want to update certain props from the body)

// deleting one or many elements from request's body
router.delete('/', deleteMany);

// deleting one element by passed param (id) in url
router.delete('/:id', deleteById) 


module.exports = router;
