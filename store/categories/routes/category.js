const express = require('express');
const router = express.Router();
const Model = require('../models/Category')

// getting all elements
router.get('/', async (req, res) => {
    try {
        const model = await Model.find();
        res.json(model);
    } catch(err) {
        res.status(400).json({ stack: err.message })
    }
});

router.get('/', async (req, res) => {
    try {
        const model = await Model.find();
        res.json(model);
    } catch(err) {
        res.status(400).json({ stack: err.message })
    }
});

// posting an element
router.post('/', async (req, res) => {
    const model = new Model({
        ...req.body
    });

    try {
        const savedModel = await model.save()
        res.json(savedModel);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

// // updating an element
// router.post('/', async (req, res) => {
//     try {
//         const updated = await Model.updateOne({...req.body})
//         res.json(updated);
//     } catch(err) {
//         res.json({ error: err.message })
//     }
// });



// deleting one or many elements
router.delete('/', async (req, res) => {
    try {
        const ids =[].concat(req.body._id);
        const removedModel = await Model.deleteMany({
            _id: {
                $in: ids
            }
        });

        res.json(removedModel);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

// getting one element by passed param (id) in url
router.get('/:nomer', async (req, res) => {
    try {
        const id = req.params.nomer // using request's PARAMS!
        const model = await Model.findById(id);

        res.json(model);
    } catch(err) {

        res.status(400).json({ error: err.message })
    }
});

// updating an element from target url param (id)
router.put("/:nomer", async (req, res) => {
    try {
        const updated = await Model.updateMany({ _id: req.params.nomer }, req.body, { new: true })
        res.json(updated);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
  })

// deleting an element from target url param (id)
router.delete('/:nomer', async (req, res) => {
    try {
        const removedModel = await Model.deleteOne({
            _id: req.params.nomer // comming from the delete request 
        });

        res.json(removedModel);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

module.exports = router;
