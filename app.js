
var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors")
var app = express();
var api = require('./routes/api')
var auth =require('./routes/auth')
const department_controller = require('./controllers/department_controller');
const product_controller = require('./controllers/product_controller');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth_test',
    { useNewUrlParser: true });

app.use('/api', api);
app.use('/auth', auth);
app.use('/departments', department_controller)
app.use('/products', product_controller)


app.use(function(req, res, next) {
    res.status(404).send('não encontrado');
});

app.listen(3000);

