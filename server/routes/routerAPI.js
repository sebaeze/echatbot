/*
*
*/
const router            = require('express').Router()   ;
const path              = require('path')  ;
const moment            = require('moment-timezone')     ;
//
import { updateTraining, addNewFilesToChatbot, saveNewFileToChatbot }    from './utilRoutes/utilRouteChatbot' ;
//
module.exports = (argConfig,argDb) => {
  //
  const autenticado  = require( path.join(__dirname,'../auth/autenticado')  ).autenticado(argDb) ;
  //
  router.get('/chatbot',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      argDb.chatbot.qry( {...req.query} )
            .then(function(respUpdate){
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                console.log('.....ERROR: GET_CHATBOT: respErr: ',respErr) ;
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
    } catch(errGetBots){
      console.log('ERROR:: "/chatbot" ',errGetBots) ;
      res.status(500) ;
      res.json(errGetBots) ;
    }
  }) ;
  //
  router.post('/chatbot',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      //
      delete req.body._v ;
      delete req.body.__v ;
      argDb.chatbot.add( {...req.body}, req.user.email )
            .then(function(respUpdate){
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
              console.log('.....ERROR: ADD_CHATBOT: respErr: ',respErr) ;
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
        //
    } catch(errGetBots){
      console.dir(errGetBots) ;
      res.status(500) ;
      res.json(errGetBots) ;
    }
    //
  }) ;
  //
  router.post('/files',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      //
      delete req.body._v  ;
      delete req.body.__v ;
      let qry = {
        idChatbot: req.body.idChatbot,
        name: req.body.name,
        type: req.body.type,
        campos:{ data: 0 }
      } ;
      //
      argDb.files.get( qry )
            .then(function(resFiles){
              if ( resFiles.length==0 ){
                return saveNewFileToChatbot( argDb, req.body, argConfig ) ;
              } else {
                return resFiles[0] ;
              }
            }.bind(this))
            .then(function(respAdd){
              let respFiles = respAdd._doc ? respAdd._doc : respAdd  ;
              if ( respFiles.data ){ delete respFiles.data; }
              delete respFiles.fullPathServer ;
              delete respFiles.__v ;
              delete respFiles.ts_last_update ;
              delete respFiles.ts_creation    ;
              res.json( respFiles );
            }.bind(this))
            .catch(function(respErr){
              console.log('.....ERROR: /files :: Adding files: ',respErr) ;
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
    //
    } catch(errGetBots){
      console.dir(errGetBots) ;
      res.status(500) ;
      res.json(errGetBots) ;
    }
    //
  }) ;
  //
  router.post('/train',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      //
      /*
      addNewFilesToChatbot( argDb, req.body, argConfig )
          .then((resuTrain)=>{
            req.body.train = resuTrain.train ;
            return argDb.chatbot.qry( {_id: req.body._id} ) ;
          })
          */
      argDb.chatbot.qry( {_id: req.body._id} )
          .then(function(chatbotInfo){
            if ( chatbotInfo.length && chatbotInfo.length>0 ){ chatbotInfo=chatbotInfo[0]; }
            let userConAcceso = !Array.isArray(chatbotInfo.accessList) ? false : chatbotInfo.accessList.find((elemEmail)=>{ return String(elemEmail).toUpperCase()==String(req.user.email).toUpperCase() ; });
            if ( userConAcceso ){
              chatbotInfo.training = Object.assign(chatbotInfo.training,req.body.train) ;
              delete chatbotInfo._v ; delete chatbotInfo.__v ;
              return updateTraining( argConfig , argDb, req.user.email, chatbotInfo ) ;
            } else {
              console.log('...*** NO POSEE ACCESO AL CHATBOT:: ',userConAcceso) ;
              objResultado.code = 401 ;
              objResultado.result = {error: `User ${req.user.email} doesn't have access to the chatbot ${req.body._id}`}
              return objResultado ;
            }
            //
          }.bind(this))
          .then(function(chatbotTrained){
            res.status( (chatbotTrained.code==0 ?  200 : chatbotTrained.code) );
            res.json( chatbotTrained ) ;
          }.bind(this))
          .catch(function(respErr){
            console.log('.....ERROR: TRAIN CHATBOT: -> ') ;
            console.dir(respErr) ;
            res.status(500) ;
            res.json(respErr) ;
          }.bind(this)) ;
      //
    } catch(errGetBots){
      console.dir(errGetBots) ;
      res.status(500) ;
      res.json(errGetBots) ;
    }
    //
  }) ;
  //
  router.delete('/train',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      argDb.chatbot.qry( {_id: req.body._id} )
          .then(function(chatbotInfo){
            if ( chatbotInfo.length && chatbotInfo.length>0 ){ chatbotInfo=chatbotInfo[0]; }
            let userConAcceso = !Array.isArray(chatbotInfo.accessList) ? false : chatbotInfo.accessList.find((elemEmail)=>{ return String(elemEmail).toUpperCase()==String(req.user.email).toUpperCase() ; });
            if ( userConAcceso ){
              delete chatbotInfo._v ; delete chatbotInfo.__v ;
              for ( let keyEntity in req.body.train ){
                console.log('....VOY A BORRAR ENTITY:: keyEntity ') ;
                delete chatbotInfo.training[ keyEntity ] ;
              }
              return updateTraining( argConfig , argDb, req.user.email, chatbotInfo ) ;
            } else {
              console.log('...*** NO POSEE ACCESO AL CHATBOT:: ',userConAcceso) ;
              objResultado.code = 401 ;
              objResultado.result = {error: `User ${req.user.email} doesn't have access to the chatbot ${req.body._id}`}
              return objResultado ;
            }
            //
          }.bind(this))
          .then(function(chatbotTrained){
            res.status( (chatbotTrained.code==0 ?  200 : chatbotTrained.code) );
            res.json( chatbotTrained ) ;
          }.bind(this))
          .catch(function(respErr){
            console.log('.....ERROR: TRAIN CHATBOT: -> ') ;
            console.dir(respErr) ;
            res.status(500) ;
            res.json(respErr) ;
          }.bind(this)) ;
      //
    } catch(errGetBots){
      console.dir(errGetBots) ;
      res.status(500) ;
      res.json(errGetBots) ;
    }
    //
  }) ;
  //
  router.delete('/chatbot',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      argDb.chatbot.inactiveChatbot( {...req.body}, req.user.email )
            .then(function(respUpdate){
              res.json( respUpdate ) ;
            }.bind(this))
            .catch(function(respErr){
                console.log('.....ERROR: DELETE_CHATBOT: -> ') ;
                console.dir(respErr) ;
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
    } catch(errGetBots){
      console.dir(errGetBots) ;
      res.status(500) ;
      res.json(errGetBots) ;
    }
    //
  }) ;
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
  return router ;
} ;
//