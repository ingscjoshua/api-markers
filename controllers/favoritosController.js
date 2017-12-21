
'use strict'
var favoritoModel = require('../models/favoritoModel');

function prueba(request,response) {
    var name = "Sin nombre";
    if (request.params.name){
        name = request.params.name
    }

	response.status(200).send({
								data: [1,"2",true,name],
								message:"hola mundo con nodeJS y express"});
}

function getFavorito(req,res){
    console.log('buscando favorito: '+req.params.id);
    var favoritoId = req.params.id;
    favoritoModel.findById(favoritoId,(err,favorito)=>{
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }
        else if(!favorito){
            res.status(404).send({message:'No se encontro marcador'});
        }
        else{
            res.status(200).send({favorito}); 
        }
       
    });
}
function getFavoritos(req,res){
    console.log('buscando favoritos');
    favoritoModel.find({}).sort('_id').exec((err,favoritos)=>{
        if(err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else if(!favoritos){
            res.status(404).send({message:'No se encontraron marcadores'});
        }
        else{
            res.status(200).send({favoritos});
        }
        
    });
}
function saveFavorito(req,res){
    var favorito = new favoritoModel();
    var params = req.body;
    favorito.title = params.title;
    favorito.description = params.description;
    favorito.url = params.url;
    favorito.save((err,favoritoStored)=>{
        if (err){
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(201).send({favorito:favoritoStored});
        }
    });
}
function updateFavorito(req,res){
    var favoritoId = req.params.id;
    var params = req.body;
    favoritoModel.findByIdAndUpdate(favoritoId,params,{new: true},(err,favoritoUpdate)=>{
        if(err){res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.status(500).send({message:'Error al actualizar el marcador'}); 
        }
        else if(!favoritoUpdate){
            res.status(404).send({message:'no existe el marcador'});
        }
        else{
            res.status(200).send({update:true,favorito:favoritoUpdate});
        }
        
    }); 
}
function deleteFavorito(req,res){
    var favoritoId = req.params.id;
    favoritoModel.findById(favoritoId,(err,favorito)=>{
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }
        else if(!favorito){
            res.status(404).send({message:'No se encontro marcador'});
        }
        else {
            favorito.remove(err=>{
                if(err){
                    res.status(500).send({message:'Error el marcador no pudo eliminarse'});
                }
                else{
                    res.status(200).send({message:'Marcador eliminado'});
                }
            });
        }
    });
}
module.exports = {
    prueba,
    getFavorito,
    getFavoritos,
    saveFavorito,
    updateFavorito,
    deleteFavorito
}