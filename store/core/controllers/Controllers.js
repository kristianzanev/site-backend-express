class Controllers {
    constructor(Model) {
        this.Model = Model;
        this.bound = { // bound functions can be destructured from the class and still have this.Model ('this' will be bound to the class not to the window)
            find: this.find.bind(this),
            findById: this.findById.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this),
            deleteMany: this.deleteMany.bind(this),
            deleteById: this.deleteById.bind(this),
        }
    }

    async find(req, res) {
        try {
            const model = await this.Model.find();
            res.json(model);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id // // comming from the get request's url param
            const model = await this.Model.findById(id);
    
            res.json(model);
        } catch(err) {
    
            res.status(400).json({ error: err.message })
        }
    }

    async create (req, res)  {
        const model = new this.Model(req.body);

        try {
            const savedModel = await model.save()
            res.json(savedModel);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }

    async update(req, res)  {
        try {
            const _id = req.body._id;
            const updated = await this.Model.updateOne({ _id }, req.body)
            res.json(updated);
        } catch(err) {
            res.json({ error: err.message });
        }
    };

    async deleteMany (req, res) {
        try {
            const ids = [].concat(req.body._id); // body should have an _id which can be one or multiple ids in an array
            const removedModel = await this.Model.deleteMany({
                _id: {
                    $in: ids
                }
            });
    
            res.json(removedModel);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }

    async deleteById (req, res)  {
        try {
            const removedModel = await this.Model.deleteOne({
                _id: req.params.id // comming from the delete request's url param
            });
    
            res.json(removedModel);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }
}

module.exports = Controllers;