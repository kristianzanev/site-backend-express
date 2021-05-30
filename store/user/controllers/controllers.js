const CoreControllers = require("../../core/controllers/Controllers");
const { Model } = require("../models/main");

class CustomControllers extends CoreControllers {
    constructor(...params) {
        super(...params)
        /**
         * here you can override existing methods or if you're willing to add custom method controller which you want export,
         * it is necessary to bind it to this and add it to the bound object.
         * Check the example below or the core class.
         */

         // this.bound.customMethod = this.customMethod.bind(this)
    }
    //  customMethod() {
    //     // do your stuff
    //  }
}

const customControllers = new CustomControllers(Model);

module.exports = customControllers.bound