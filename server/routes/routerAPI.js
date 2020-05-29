/*
*
*/
const router            = require('express').Router()   ;
const path              = require('path')  ;
const moment            = require('moment-timezone')     ;
//
import { enviarEmail as emailSMTP }             from '../lib/emailSMTP'      ;
import { APP_GLOBALES }                         from '../config/variablesGlobales' ;
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
      let qry = { ...req.query, idUser: req.user.email } ;
      argDb.chatbot.qry( qry )
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
      //
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
      argDb.chatbot.qry( {_id: req.body._id} )
          .then(function(chatbotInfo){
            if ( chatbotInfo.length && chatbotInfo.length>0 ){ chatbotInfo=chatbotInfo[0]; }
            let userConAcceso = !Array.isArray(chatbotInfo.accessList) ? false : chatbotInfo.accessList.find((elemEmail)=>{ return String(elemEmail).toUpperCase()==String(req.user.email).toUpperCase() ; });
            if ( userConAcceso ){
             chatbotInfo.idChatbot = req.body._id || chatbotInfo.idChatbot ;
             chatbotInfo.train     = req.body.train || {} ;
              return updateTraining( argConfig , argDb, req.user.email, chatbotInfo, false ) ;
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
              chatbotInfo.train = req.body.train ;
              return updateTraining( argConfig , argDb, req.user.email, chatbotInfo, true ) ;
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
  router.get('/slot/query',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      argDb.slots.qry( req.query )
          .then(function(resuSlot){
            res.json({
              resultCode: 0,
              data: resuSlot
            }) ;
          }.bind(this))
          .catch(function(respErr){
            console.log('.....ERROR: QUERY SLOT -> ') ;
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
  router.post('/slot/update',autenticado,function(req,res,next){
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try {
      argDb.slots.add( req.body )
          .then(function(resuSlot){
            res.json({
              resultCode: 0,
              data: resuSlot
            }) ;
          }.bind(this))
          .catch(function(respErr){
            console.log('.....ERROR: UPDATE SLOT -> ') ;
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
      let qry = { ...req.body, idUser: req.user.email } ;
      argDb.chatbot.inactiveChatbot( qry, req.user.email )
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
  //
  router.get('/account/user', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    try{
      //
      if ( req.user ){
        //console.log('....user:: ',req.user) ;
        res.json({
          resultCode: 0,
          result: {
            email: req.user.email,
            nombre: req.user.nombre||false,
            apellido: req.user.apellido||false,
            fotos: req.user.fotos||false,
            id: req.user._id||false,
            provider: req.user.provider||false,
            celular: req.user.celular||'',
            fullNombre: req.user.fullNombre||'',
            seguridad: req.user.seguridad||false,
            pais: req.user.seguridad||'',
            provincia: req.user.provincia||'',
            ciudad: req.user.ciudad||'',
            ordenes: req.user.ordenes||[]
          }
        }) ;
      } else {
        res.json({
          resultCode: APP_GLOBALES.RESULT_CODES.USER_NOT_LOGGED ,
          result: {}
        }) ;
      }
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.post('/auth/passwordupdate',function(req,res,next){
    try {
      //
      let newResponse = {} ;
      let newRegExt = new RegExp( req.body.email, "i" ) ;
      argDb.usuarios.get( { email: newRegExt } )
        .then((respDb)=>{
          if ( respDb.length>0 ){ respDb=respDb[0]; }
          if ( respDb.length==0 ){
            newResponse = {
              resultCode: APP_GLOBALES.RESULT_CODES.USER_EMAIL_DO_NOT_EXIST,
              result:{error:"Email not found"}
            }
            return  newResponse ;
          } else {
            if ( respDb.password==req.body.token ){
              return argDb.usuarios.updatePassword({flagReset: false, _id: respDb._id, oldLog: respDb.log||[], newPassword: req.body.password })
                .then((respOk)=>{
                  newResponse = {
                    resultCode: APP_GLOBALES.RESULT_CODES.OK,
                    result:{msg: `Password actualizada` }
                  }
                  return  newResponse ;
                })
                .catch((respErr)=>{
                  newResponse = {
                    resultCode: APP_GLOBALES.RESULT_CODES.ERROR_INTERNO,
                    result:{ error: respErr }
                  }
                  return  newResponse ;
                })
            } else {
              console.log('...p :',respDb.password,' tok: ',req.body.token) ;
              newResponse = {
                resultCode: APP_GLOBALES.RESULT_CODES.USER_INVALID_TOKEN,
                result:{error: `Token invalido: ${req.body.token}` }
              }
              return  newResponse ;
            }
          }
        })
        .then((respUpdte)=>{
          res.json( respUpdte ) ;
        })
        .catch((errDb)=>{
          res.status(500) ;
          res.json({error: errDb}) ;
        })
      //
    } catch(errPswReset){
      console.dir(errPswReset) ;
      res.status(500) ;
      res.json(errPswReset) ;
    }
  }) ;
  //
  router.post('/auth/passwordreset',function(req,res,next){
    try {
      //
      // let smtpMsg = `<p style="font-weight:bold;font-size:18px;"></p><pre>Utilize el siguiente link para recuperar su password => ${urlLink} </pre>` ;
      //
      let newResponse = {} ;
      let newRegExt = new RegExp( req.body.emailReset, "i" ) ;
      argDb.usuarios.get({email: newRegExt })
        .then((respDb)=>{
          if ( respDb.length>0 ){ respDb=respDb[0]; }
          if ( respDb.length==0 ){
            return false ;
          } else {
            return argDb.usuarios.updatePassword({flagReset:true, _id: respDb._id, oldLog: respDb.log||[]}) ;
          }
        })
        .then((respPsw)=>{
          let urlLink             =   ( typeof argConfig.urlEmpresa[ process.env.AMBIENTE||"DEV" ]=="undefined"
                                            ? req.protocol+"://"+req.get('host')+"/"
                                            : argConfig.urlEmpresa[ process.env.AMBIENTE||"DEV" ]
                                      )
                                     + `account/reset/${respPsw._id}/${respPsw.password}` ;
          console.log('....reset: urlLink: ',urlLink,' req: ',req.protocol,req.get('X-Forwarded-Protocol'),req.get('host'),req.originalUrl) ;
          newResponse.resultCode = respPsw==false ? APP_GLOBALES.RESULT_CODES.USER_EMAIL_DO_NOT_EXIST : APP_GLOBALES.RESULT_CODES.OK ;
          newResponse.result     = respPsw==false ? "" : { _id: respPsw._id } ; // token: respPsw.password,url: `/auth/reset/${respPsw._id}/${respPsw.password}` } ;
          //
          return emailSMTP({...argConfig},"Password Reset",req.body.emailReset,
          `<p style="font-weight:bold;font-size:18px;"></p><pre>Continue por el siguiente link para recuperar la password => ${urlLink} </pre>`
              )
          //
        })
        .then((respPswDB)=>{
          res.json(newResponse) ;
        })
        .catch((errDb)=>{
          res.status(500) ;
          res.json({error: errDb}) ;
        })
      //
    } catch(errPswReset){
      console.dir(errPswReset) ;
      res.status(500) ;
      res.json(errPswReset) ;
    }
  }) ;
  //
  router.post('/error/console',function(req,res,next){
    try {
      //
      console.log('...ERROR: ',req.body) ;
      //
      res.json({msg:'ok'}) ;
      //
    } catch(errPswReset){
      res.status(500) ;
      res.json(errPswReset) ;
    }
  }) ;
  //
  return router ;
} ;
//