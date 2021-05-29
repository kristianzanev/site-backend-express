const express = require('express');
const router = express.Router();
const { Model } = require('../models/main')
const { find, create, deleteById, findById, deleteMany, update } = require('../controllers/controllers')

// getting all elements
// router.get('/', async (req, res) => {
//     try {
//         const model = await Model.find();
//         res.json(model);
//     } catch(err) {
//         res.status(400).json({ stack: err.message })
//     }
// });

// getting all elements
router.get('/', find);

// getting one element by passed param (id) in url
router.get('/:id', findById) 

// creating an element
router.post('/', create);

// updating an element
router.put('/', update);

// deleting one or many elements from request's body
router.delete('/', deleteMany);

// deleting one element by passed param (id) in url
router.delete('/:id', deleteById) 

// posting an element
// router.post('/', async (req, res) => {
//     const model = new Model({
//         ...req.body
//     });

//     try {
//         const savedModel = await model.save()
//         res.json(savedModel);
//     } catch(err) {
//         res.status(400).json({ error: err.message })
//     }
// });

// // updating an element
// router.post('/', async (req, res) => {
//     try {
//         const updated = await Model.updateOne({...req.body})
//         res.json(updated);
//     } catch(err) {
//         res.json({ error: err.message })
//     }
// });



// deleting one or many elements from request's body
// router.delete('/', async (req, res) => {
//     try {
//         const ids =[].concat(req.body._id);
//         const removedModel = await Model.deleteMany({
//             _id: {
//                 $in: ids
//             }
//         });

//         res.json(removedModel);
//     } catch(err) {
//         res.status(400).json({ error: err.message })
//     }
// });



// router.get('/:id', async (req, res) => {
//     try {
//         const id = req.params.id // using request's PARAMS!
//         const model = await Model.findById(id);

//         res.json(model);
//     } catch(err) {

//         res.status(400).json({ error: err.message })
//     }
// });

// updating an element from target url param (id)
router.put("/:id", async (req, res) => {
    try {
        const updated = await Model.updateMany({ _id: req.params.id }, req.body, { new: true })
        res.json(updated);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

// deleting an element from target url param (id)
// router.delete('/:id', async (req, res) => {
//     try {
//         const removedModel = await Model.deleteOne({
//             _id: req.params.id // comming from the delete request 
//         });

//         res.json(removedModel);
//     } catch(err) {
//         res.status(400).json({ error: err.message })
//     }
// });

module.exports = router;
