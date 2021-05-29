class Controllers {
    constructor(Model) {
        this.Model = Model;
        this.bound = { // bound functions can be destructured from the class and still have this.Model 
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
            res.status(400).json({ stack: err.message })
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

    create() {
        // override it
        // most props of a Model will be different and it isn't good practice to pass the whole req.body when creating an element
        // so that's why this should be a custom method
    }

    update() {
        // override it
        // same rules from the create method applies here
    }

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