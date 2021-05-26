const express = require('express');
const router = express.Router();
const Categories = require('../models/Categories')

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch(err) {
        res.json({ stack: err.stack })
    }
})

router.post('/', async (req, res) => {
    const categories = new Categories({
        ...req.body
    });

    try {
        const savedCategory = await categories.save()
        res.json(savedCategory);
    } catch(err) {
        res.json({ error: err.message })
    }
})

module.exports = router;