/*
*
*/
const router            = require('express').Router()   ;
const path              = require('path') ;
const moment            = require('moment-timezone')     ;
//
module.exports = (argConfig,argDb) => {
  const autenticado  = require( path.join(__dirname,'../auth/autenticado')  ).autenticado(argDb) ;
  //
  router.get('/user',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      if ( req.user ){
        res.status(200) ;
        res.json(req.user) ;
      } else {
        res.status(401) ;
        res.json({error:'Unauthorized',description:'USer should be authenticated'}) ;
      }
    } catch(errGetUser){
      res.status(500) ;
      res.json(errGetUser) ;
    }
    //
  }) ;
  //
  router.post('/user', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      argDb.usuarios.add( {...req.body} )
            .then(function(respUpdate){
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                console.log('.....ERROR: POST_USER: -> ') ;
                console.dir(respErr) ;
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.post('/consultas', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      //
      let nuevaConsulta = {...req.body} ;
      argDb.consultas.add( nuevaConsulta )
            .then(function(respUpdate){
              console.log('....respuesta de merge Consultas:: ')  ;
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                //
                console.log('.....error merge ordenes: ') ;
                console.dir(respErr) ;
                //
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.post('/suscripcion', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      //
      let nuevaSuscripcion            = {...req.body} ;
      nuevaSuscripcion.suscripcion    = true ;
      nuevaSuscripcion.ts_suscripcion = moment( new Date() ).tz("America/Argentina/Buenos_Aires") ;
      //
      argDb.usuarios.add( nuevaSuscripcion )
            .then(function(respUpdate){
              console.log('....respuesta de ADD Suscripcion:: ')  ;
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                console.log('.....error ADD Suscripcion: ') ;
                console.dir(respErr) ;
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.post('/ordenes', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      //
      let nuevaorden = {...req.body} ;
      argDb.ordenes.merge( nuevaorden )
            .then(function(respUpdate){
              console.log('....respuesta de merge ordenes:: ')  ;
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                //
                console.log('.....error merge ordenes: ') ;
                console.dir(respErr) ;
                //
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.get('/qryProductos', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      //
      console.log('......qry_productos: ');
      console.dir(req.query) ;
      //
      argDb.productos.get( req.query )
            .then(function(respUpdate){
              console.log('....respuesta de qry productos:: ')  ;
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                //
                console.log('.....error get productos: ') ;
                console.dir(respErr) ;
                //
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  return router ;
} ;
//