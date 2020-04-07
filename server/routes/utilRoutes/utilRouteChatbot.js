/*
*
*/
const fs         = require('fs')    ;
const fsPromises = require('fs').promises;
const axios      = require('axios') ;
const path       = require('path')  ;
const rootCA     = require('ssl-root-cas/latest').inject().addFile( path.join(__dirname,'../../cert/waiboc.com.fullchain.pem') );
//
let API_NLP      = false ;
//
export const saveNewFileToChatbot = (argDb,argFile,argConfig) => {
  //
  const CONFIG_API        = argConfig.API[ (process.env.AMBIENTE ? process.env.AMBIENTE : 'dev' )  ] ;
  //
  return new Promise(function(respData,respRech){
    try {
        //
        argFile['relativePath']   = path.sep + argFile.idChatbot + path.sep + argFile.name ;
        argFile['fullPathServer'] = CONFIG_API.PATH_STORAGE + argFile['relativePath'] ;
        let path2Chatbot          = CONFIG_API.PATH_STORAGE + path.sep + argFile.idChatbot ;
        //
        if ( !fs.existsSync(path2Chatbot) ){ fs.mkdirSync( path2Chatbot ) ; }
        //
        argFile.data = argFile.data.substr( (argFile.data.indexOf(',') + 1) ) ;// Remove "data:image/png;base64,"
        fsPromises.writeFile( argFile.fullPathServer , Buffer.from( argFile.data,'base64').toString('binary') ,  "binary" )
          .then((respWrite)=>{
            return argDb.files.add( argFile ) ;
          })
          .then((respAddFile)=>{
            if ( respAddFile.length>0 ){ respAddFile=respAddFile[0]; }
            respData( respAddFile ) ;
          })
          .catch((errAddAll)=>{
            respRech(errAddAll) ;
          }) ;
      //
    } catch(errANFTC){
      respRech(errANFTC) ;
    }
  }) ;
} ;
//
export const addNewFilesToChatbot = (argDb,argChatbotTrain,argConfig) => {
    //
    const CONFIG_API        = argConfig.API[ (process.env.AMBIENTE ? process.env.AMBIENTE : 'dev' )  ] ;
    //
    return new Promise(function(respData,respRech){
      try {
        let arrayFilesPromises = [] ;
        Object.values(argChatbotTrain.train).forEach((elemEntity)=>{
          if ( elemEntity.answer.files ){
            elemEntity.answer.files.forEach((elemFile)=>{
              if ( elemFile.flagNewFile && elemFile.flagNewFile==true ){
                elemFile['idChatbot'] = argChatbotTrain._id ;
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
        let arrayPromises = [] ;
        for ( let keyInt in argBotTrained.train ){
          let elemIntent = argBotTrained.train[ keyInt ] ;
          elemIntent.idChatbot = argBotTrained.idChatbot ;
          // console.log('....kk: ',keyInt,' elemIntent: ',elemIntent) ;
          arrayPromises.push(
            argDb.intents.add( elemIntent )
          ) ;
        }
        //
        //argDb.chatbot.add( {...argBotTrained}  )
        Promise.all( arrayPromises )
            .then((respUpd)=>{
              //console.log('...finisg train:: respUpd: ',respUpd) ;
              /*
              if ( respUpd.length && respUpd.length>0 ){ respUpd=respUpd[0]; }
              respUpd = respUpd._doc ? respUpd._doc : respUpd ;
              objResultado.code   = 0 ;
              objResultado.result = respUpd.training ;
              */
              objResultado.code   = 0 ;
              objResultado.result = respUpd ;
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