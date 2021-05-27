const express = require('express');
const router = express.Router();
const Category = require('../models/Category')

// getting all elements
router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch(err) {
        res.status(400).json({ stack: err.message })
    }
});

// posting an element
router.post('/', async (req, res) => {
    const category = new Category({
        ...req.body
    });

    try {
        const savedCategory = await category.save()
        res.json(savedCategory);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

// // updating an element
// router.post('/', async (req, res) => {
//     try {
//         const updated = await Category.updateOne({...req.body})
//         res.json(updated);
//     } catch(err) {
//         res.json({ error: err.message })
//     }
// });



// deleting one or many elements
router.delete('/', async (req, res) => {
    try {
        const ids =[].concat(req.body._id);
        const removedCategories = await Category.deleteMany({
            _id: {
                $in: ids
            }
        });

        res.json(removedCategories);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

// getting one element by passed param (id) in url
router.get('/:nomer', async (req, res) => {
    try {
        const id = req.params.nomer // using request's PARAMS!
        const category = await Category.findById(id);

        res.json(category);
    } catch(err) {

        res.status(400).json({ error: err.message })
    }
});

// updating an element from target url param (id)
router.put("/:nomer", async (req, res) => {
    try {
        const updated = await Category.updateMany({ _id: req.params.nomer }, req.body, { new: true })
        res.json(updated);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
  })

// deleting an element from target url param (id)
router.delete('/:nomer', async (req, res) => {
    try {
        const removedCategory = await Category.deleteOne({
            _id: req.params.nomer // comming from the delete request 
        });

        res.json(removedCategory);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

module.exports = router;
