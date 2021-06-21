var express = require('express');
const { route } = require('./department_controller');
var router = express.Router();
var Products = require('../models/product');

router.post('/', (req, res) => {
    let p = new Products({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        departments: req.body.departments
    });
    p.save((err, prod) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    })
})


router.get('/', (req, res) => {
    Products.find().exec((err, prods) => {
        if(err) {
            res.status(500).send(err);
            }
            
        else {
            res.status(200).send(prods);
        }
            
    })
})

router.delete('/:id', (req, res) => {
    Products.deleteOne({_id: req.params.id}, (err) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send();
    })
})


router.patch('/:id', (req, res) => {
    Products.findById(req.params.id, (err, prod) => {
        if(err)
            res.status(500).send(err);
        else if(!prod)
            res.status(404).send({})
        else {
            prod.name = req.body.name;
            prod.price = req.body.price;
            prod.stock = req.body.stock;
            prod.departments = req.body.departments;
            prod.save((err, prod) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(prod);
            })
        }    
            
    })
})

module.exports = router;
