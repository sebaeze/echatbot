/*
*
*/
const axios      = require('axios') ;
const path       = require('path')  ;
const rootCA     = require('ssl-root-cas/latest').inject().addFile( path.join(__dirname,'../../cert/waiboc.com.fullchain.pem') );
//
let API_NLP      = false ; //argConfig.API[process.env.AMBIENTE||'dev'] || false ;
//
export const addNewFilesToChatbot = (argDb,argChatbotTrain) => {
    return new Promise(function(respData,respRech){
      try {
        let arrayFilesPromises = [] ;
        Object.values(argChatbotTrain.train).forEach((elemEntity)=>{
          if ( elemEntity.answer.files ){
            elemEntity.answer.files.forEach((elemFile)=>{
              if ( elemFile.flagNewFile && elemFile.flagNewFile==true ){
                elemFile['idChatbot'] = argChatbotTrain._id ; // _id de chatbot
                elemFile.flagNewFile  = false ;
                arrayFilesPromises.push( elemFile ) ;
              }
            }) ;
          }
        }) ;
        //
        if ( arrayFilesPromises.length>0 ){
          argDb.files.add( arrayFilesPromises )
            .then((respAddFiles)=>{
              if ( !Array.isArray(respAddFiles) ){ respAddFiles=new Array(respAddFiles); }
              respAddFiles.forEach((elemFileAdded)=>{
                for ( let keyElemEntity in argChatbotTrain.train ){
                  let elemEntity = argChatbotTrain.train[keyElemEntity] ;
                  if ( elemEntity.answer.files && elemEntity.answer.files.length>0 ){
                    elemEntity.answer.files.forEach((elemEntt,indEntt)=>{
                      if ( elemEntt.name==elemFileAdded.name ){
                        elemEntt = {
                          _id: elemFileAdded._id ,
                          name: elemFileAdded.name ,
                          type: elemFileAdded.type ,
                          lastModified: elemFileAdded.lastModified

                        } ;
                        elemEntity.answer.files[indEntt] = elemEntt ;
                      }
                    }) ;
                    //
                    argChatbotTrain.train[keyElemEntity] = elemEntity ;
                    //
                  }
                } ;
              }) ;
              respData( argChatbotTrain ) ;
            })
            .catch((errAddAll)=>{
              respRech(errAddAll) ;
            })
        } else {
          respData( argChatbotTrain ) ;
        }
        //
      } catch(errANFTC){
        respRech(errANFTC) ;
      }
    }) ;
} ;
//
let objResultado = { code: 0, result: {} } ;
export const updateTraining = (argConfig,argDb,argEmail,argBotTrained) => {
  return new Promise(function(respData,respRech){
    try {
        //
        if (API_NLP==false){ API_NLP=argConfig.API[process.env.AMBIENTE||'dev'] || null } ;
        //
        argDb.chatbot.add( {...argBotTrained}  )
            .then((respUpd)=>{
            if ( respUpd.length && respUpd.length>0 ){ respUpd=respUpd[0]; }
            respUpd = respUpd._doc ? respUpd._doc : respUpd ;
            objResultado.code   = 0 ;
            objResultado.result = respUpd.training ;
            let tempReqbody = { idAgente: argBotTrained._id, emailUserid: argEmail, secretAPInlp: API_NLP.NLP_TRAIN_SECRET } ;
            //
            let reqOptions = { url: API_NLP.NLP_TRAIN, method: 'POST', data: tempReqbody, ca: rootCA } ;
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