/*
*
*/
const router            = require('express').Router()   ;
const fs                = require('fs')    ;
const http              = require('http')  ;
const https             = require('https') ;
const path              = require('path')  ;
const axios             = require('axios') ;
const moment            = require('moment-timezone')     ;
//
const rootCA = require('ssl-root-cas/latest').inject().addFile( path.join(__dirname,'../cert/waiboc.com.fullchain.pem') );
//
module.exports = (argConfig,argDb) => {
  let API_NLP        = argConfig.API[process.env.AMBIENTE||'dev'] || false ;
  const autenticado  = require( path.join(__dirname,'../auth/autenticado')  ).autenticado(argDb) ;
  //
  const addNewFilesToChatbot = (argChatbotTrain) => {
    return new Promise(function(respData,respRech){
      try {
        console.log('....addNewFilesToChatbot:: (A) ',argChatbotTrain) ;
        let arrayFilesPromises = [] ;
        Object.values(argChatbotTrain.train).forEach((elemEntity)=>{
          if ( elemEntity.answer.files ){
            elemEntity.answer.files.forEach((elemFile)=>{
              if ( elemFile.flagNewFile && elemFile.flagNewFile==true ){
                elemFile['idChatbot'] = argChatbotTrain._id ; // _id de chatbot
                elemFile.flagNewFile  = false ;
                console.log('....file 2 add:: ',elemFile) ;
                arrayFilesPromises.push( argDb.files.add(elemFile) ) ;
              }
            }) ;
          }
        }) ;
        //
        console.log('....addNewFilesToChatbot:: (b) ll: '+arrayFilesPromises.length) ;
        if ( arrayFilesPromises.length>0 ){
          Promise.all( arrayFilesPromises )
            .then((respAddFiles)=>{
              console.log('....then ADD all files:: respAddFiles: ',respAddFiles) ;
              respData( argChatbotTrain ) ;
            })
            .catch((errAddAll)=>{
              respRech(errAddAll) ;
            })
        } else {
          console.log('....addNewFilesToChatbot:: (zzz) ll: '+arrayFilesPromises.length) ;
          respData( argChatbotTrain ) ;
        }
        //
      } catch(errANFTC){
        respRech(errANFTC) ;
      }
    }) ;
  } ;
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
                console.log('.....ERROR: GET_CHATBOT: -> ') ;
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
      //
      argDb.chatbot.add( {...req.body}, req.user.email )
            .then(function(respUpdate){
              res.json( (respUpdate._doc||respUpdate) );
            }.bind(this))
            .catch(function(respErr){
                console.log('.....ERROR: ADD_CHATBOT: -> ') ;
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
  router.post('/train',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      //
      let objResultado = { code: 0, result: {} } ;
      const updateTraining = (argBotTrained) => {
        return new Promise(function(respData,respRech){
          try {
            argDb.chatbot.add( {...argBotTrained}, req.user.email )
              .then((respUpd)=>{
                if ( respUpd.length && respUpd.length>0 ){ respUpd=respUpd[0]; }
                respUpd = respUpd._doc ? respUpd._doc : respUpd ;
                objResultado.code   = 0 ;
                objResultado.result = respUpd.training ;
                let tempReqbody = { idAgente: argBotTrained._id, emailUserid: req.user.email, secretAPInlp: API_NLP.NLP_TRAIN_SECRET } ;
                //
                console.log('....API_NLP.NLP_TRAIN: ',API_NLP.NLP_TRAIN) ;
                let reqOptions = {
                  url: API_NLP.NLP_TRAIN,
                  method: 'POST',
                  data: tempReqbody,
                  ca: rootCA
                } ;
                return axios( reqOptions ) ;
                //
              })
              .then((respTrainApi)=>{
                respData(objResultado) ;
              })
              .catch((errUT)=>{
                objResultado.code   = 500 ;
                objResultado.result = {error: errUT, message: errUT} ;
                respRech(objResultado) ;
              }) ;
          } catch(errUT){
            respRech(errUT) ;
          }
        }) ;
      }
      //
      console.log('.../train::: body: ') ;
      Object.values(req.body.train).forEach((elemT)=>{
        console.log('....elemT.answer.files.length:: ',elemT.answer.files.length) ;
      }) ;
      //
      addNewFilesToChatbot( req.body )
          .then((resuTrain)=>{
            req.body.train = resuTrain ;
            return argDb.chatbot.qry( {_id: req.body._id} ) ;
          })
      //argDb.chatbot.qry( {_id: req.body._id} )
          .then(function(chatbotInfo){
            if ( chatbotInfo.length && chatbotInfo.length>0 ){ chatbotInfo=chatbotInfo[0]; }
            let userConAcceso = !Array.isArray(chatbotInfo.accessList) ? false : chatbotInfo.accessList.find((elemEmail)=>{ return String(elemEmail).toUpperCase()==String(req.user.email).toUpperCase() ; });
            if ( userConAcceso ){
              chatbotInfo.training = Object.assign(chatbotInfo.training,req.body.train) ;
              delete chatbotInfo._v ; delete chatbotInfo.__v ;
              return updateTraining( chatbotInfo ) ;
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