'use strict'
var app = require('./app');
var mongoose = require('mongoose');
var port = process.env.PORT || 3901;
mongoose.connect('mongodb://localhost:27017/favoritos',{ useMongoClient: true }).then(()=>{
		console.log('Conexion a mongoDB correcta');
		app.listen(port,()=>{
			console.log(`API REST FAVORITOS ready on ${port}`);
		});
	}).catch(err => console.error(err));
	


