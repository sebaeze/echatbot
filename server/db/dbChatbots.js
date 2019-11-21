/*
dbChatbots
*/
const Db              = require('./db').classDb        ;
const schemaUsuarios  = require('./modelos/schemaChatbots').schema ;
const chatbotStatus   = require('./modelos/schemaChatbots').status ;
const moment          = require('moment-timezone')     ;
//
class dbChatbots extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'chatbots' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaUsuarios) ;
    }
    //
    add(argObjBot){
        return new Promise(function(respData,respRej){
            try {
                //
                if ( !Array.isArray(argObjBot) ){ argObjBot=new Array(argObjBot);  } ;
                if ( Array.isArray(argObjBot) && argObjBot.length==0 ){
                    return([]) ;
                }
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        let arrayPromises = [] ;
                        argObjBot.forEach(elemUsr => {
                            arrayPromises.push( this.utilMongo.promiseFindUpdate( this.colleccion , elemUsr ) ) ;
                        }) ;
                        if ( arrayPromises.length>0 ){
                            return Promise.all( arrayPromises ) ;
                        } else {
                            return [] ;
                        }
                        //
                    }.bind(this))
                    .then(function(argArrayUsrInserted){
                        respData( argArrayUsrInserted ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    qry(argObjBusqueda){
        return new Promise(function(respData,respRej){
            try {
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        return this.colleccion.find( argObjBusqueda, null, {lean: true} ).exec() ;
                        //
                    }.bind(this))
                    .then(function(arrayClientes){
                        respData( arrayClientes ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errGetCli){
                respRej(errGetCli) ;
            }
        }.bind(this)) ;
    }
    //
    inactiveChatbot(argChatbot, argEmailReq){
        return new Promise(function(respData,respRej){
            try {
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        return this.qry( {_id: argChatbot._id} ) ;
                        //
                    }.bind(this))
                    .then(function(argQryBot){
                        //
                        if ( Array.isArray(argQryBot) && argQryBot.length>0 ){ argQryBot=argQryBot[0]; }
                        if ( this.userHasAccess(argEmailReq,argQryBot)==true ){
                            argQryBot.status      = chatbotStatus.INACTIVE ;
                            argQryBot.ts_inactive = moment( new Date() ).tz("America/Argentina/Buenos_Aires") ;
                            delete argQryBot._v  ;
                            delete argQryBot.__v ;
                            return this.add( argQryBot ) ;
                        } else {
                            return argQryBot ;
                        }
                        //
                    }.bind(this))
                    .then(function(argRespDeleted){
                        if ( this.userHasAccess(argEmailReq,(argRespDeleted._doc ? argRespDeleted._doc : argRespDeleted))==true ){
                            respData( {
                                resultCode: 0,
                                result: argRespDeleted._doc ? argRespDeleted._doc : argRespDeleted
                            } ) ;
                        } else {
                            respData( {
                                resultCode: 1000,
                                message: 'USER_NOT_ALLOWED_TO_UPDATE_CHATBOT',
                                result: argRespDeleted._doc ? argRespDeleted._doc : argRespDeleted
                            } ) ;
                        }
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this)) ;
    }
    //
    userHasAccess(argEmail,argChatbotDef){
        try {
            let tempEmail        = String(argEmail).toUpperCase() ;
            let tempBotDef       = (argChatbotDef.length && argChatbotDef.length>0) ? argChatbotDef[0] : {...argChatbotDef} ;
            let flagPosseAccesos = (tempBotDef.idUser.toUpperCase()==tempEmail) ;
            if ( !flagPosseAccesos ){
                if ( tempBotDef.length && tempBotDef.length>0 ){ tempBotDef = tempBotDef[0] ; }
                flagPosseAccesos = ( tempBotDef.accessList.length>0 && tempBotDef.accessList.findIndex((elem)=>{return elem.toUpperCase()==tempEmail})!=-1 ) ;
            }
            //
            console.log('....email:: '+tempEmail+' flagPosseAccesos: '+flagPosseAccesos+' accessl: ') ;
            return flagPosseAccesos ;
            //
        } catch(errUHA){
            throw errUHA ;
        }
    }
    //
}
//
module.exports.classDb       = dbChatbots ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new dbChatbots(argConfiguracion) ;
    return objMongoDbMl ;
}
//