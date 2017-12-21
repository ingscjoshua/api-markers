'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var api = require('./routes/favoritosRoutes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Acces-Control-Reqeust-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/api',api);

module.exports = app;