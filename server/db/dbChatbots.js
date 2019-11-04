/*
dbChatbots
*/
const Db              = require('./db').classDb        ;
const schemaUsuarios  = require('./modelos/schemaChatbots') ;
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
                if ( Array.isArray(argObjBot) && argObjBot.length==0 ){ return([]); } ;
                /*
                let flagUsrSinID = false ;
                for( let posUsr=0;posUsr<argObjBot.length;posUsr++){
                    if ( !argObjBot[posUsr]._id ){
                        if ( argObjBot[posUsr].email || argObjBot[posUsr].id ){
                            argObjBot[posUsr]._id = argObjBot[posUsr].email || argObjBot[posUsr].id ;
                        } else {
                            flagUsrSinID = true ;
                        }
                    }
                }
                */
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
}
//
module.exports.classDb       = dbChatbots ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new dbChatbots(argConfiguracion) ;
    return objMongoDbMl ;
}
//