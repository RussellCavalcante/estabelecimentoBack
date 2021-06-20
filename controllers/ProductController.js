var ProductModel = require("../models/ProductModel");
var router = express.Router();

module.exports = {
    all: function(req, res) {
        ProductModel.find({}).lean().exec(function(err, products) {
            if (err)
                return res.json([]);
            return res.json(products);
        })
    }
};