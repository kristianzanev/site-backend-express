const CoreControllers = require("../../core/controllers/Controllers");
const { Model } = require("../models/main");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class CustomControllers extends CoreControllers {
    constructor(...params) {
        super(...params)
        /**
         * here you can override existing methods or if you're willing to add custom method controller which you want to export,
         * it is necessary to bind it to this and add it to the bound object.
         * Check the example below or the core class.
         */

         // this.bound.customMethod = this.customMethod.bind(this)
         this.bound.login = this.login.bind(this)
    }
    //  customMethod() {
    //     // do your stuff
    //  }
    async create (req, res)  {
        const err = new this.Model(req.body).validateSync();
        if (err) return res.status(400).json({ error: err.message });

        //encrypting pass
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const model = new this.Model({...req.body, password});

        try {
            const savedModel = await model.save()
            res.json(savedModel);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }

    async login (req, res)  {
        try {
            const user = await this.Model.findOne({email: req.body.email});

            if (!user) throw { message: `user doesn't exist` };

            const decryptedPass = await bcrypt.compare(req.body.password, user.password);

            if (!decryptedPass) throw { message: `incorrect pass` };

            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

            // storing token in safe cookie
            res.cookie("auth", JSON.stringify(token), {
                secure: true,
                httpOnly: true,
            });
            //res.header('auth-token', token)
            res.json(token);
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }
}

const customControllers = new CustomControllers(Model);

module.exports = customControllers.bound