var express = require('express');
var router = express.Router();
var Department = require('../models/department');

router.post('/', function(req, res ) {
    console.log(req.body);
    let d = new Department({name: req.body.name,
    location: req.body.location});
    d.save((err, dep) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(dep);
    })
})

router.get('/', function(req, res ) {
    console.log(req.body);
    Department.find().exec((err, dep) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(dep);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Department.deleteOne({_id: id}, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});    
    })

})

router.patch('/:id', (req, res) => {
    Department.findById(req.params.id, (err, dep) => {
        if (err)
            res.status(500).send(err);
        else if (!dep)
            res.status(404).send({});
        else {
            dep.name = req.body.name;
            dep.location = req.body.location
            dep.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e));
        }
    })
})

router.patch('/:location', (req, res) => {
    Department.findById(req.params.location, (err, dep) => {
        if (err)
            res.status(500).send(err);
        else if (!dep)
            res.status(404).send({});
        else {
            if(dep){
                res.status(200);
            }else{
                res.status(500);
            }
        }
    })
})
module.exports = router;