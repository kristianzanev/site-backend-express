const CoreControllers = require("../../core/controllers/Controllers");
const { Model } = require("../models/main");

class CustomControllers extends CoreControllers {
    constructor(...params) {
        super(...params)
        /**
         * if you're willing to add custom method controller which you want export,
         * it is necessary to add it to the bound object.
         * Check the example below or the core class.
         */

         // this.bound.customMethod = this.customMethod.bind(this)
    }
    //  customMethod() {
    //     // do your stuff
    //  }
    
    async create (req, res)  {
        const model = new this.Model({
            name: req.body.name
        });

        try {
            const savedModel = await model.save()
            res.json(savedModel);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }

    async update(req, res)  {
        try {
            const updated = await this.Model.updateOne({ _id: req.body._id }, { name: req.body.name })
            res.json(updated);
        } catch(err) {
            res.json({ error: err.message });
        }
    };
}

const customControllers = new CustomControllers(Model);

module.exports = customControllers.bound