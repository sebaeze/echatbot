/*
*
*/
const Db                    = require('./db').classDb        ;
const schemaDistribuidores  = require('./modelos/schemaDistribuidores') ;
//
class DbDistribuidores extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'distribuidores' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaDistribuidores) ;
    }
    //
    add(argObjProducto){
        return new Promise(function(respData,respRej){
            try {
                //
                let arraydocs = Array.isArray(argObjProducto) ? argObjProducto : new Array(argObjProducto) ;
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return argDb ;
                    }.bind(this))
                    .then(function(argDbConn){
                        console.log(new Date().toISOString()+'....voy a hacer update de productos:: cantidad: '+arraydocs.length) ;
                        let arrayPromises = [] ;
                        arraydocs.forEach(elemDistribuidor => {
                            if ( !elemDistribuidor._id ){ elemDistribuidor._id = elemDistribuidor.razonSocial.toUpperCase() ; }
                            arrayPromises.push( this.utilMongo.promiseFindUpdate( this.colleccion , elemDistribuidor ) ) ;
                        }) ;
                        if ( arrayPromises.length>0 ){
                            return Promise.all( arrayPromises ) ;
                        } else {
                            return [] ;
                        }
                        //
                    }.bind(this))
                    .then(function(resuUpd){
                        respData( arraydocs ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    get(argSelector){
        return new Promise(function(respPromiseGet,respRej){
            try {
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        if ( argSelector.textoBusqueda ){
                            let tempText = argSelector.textoBusqueda.trim() ;
                            if ( argSelector.textoBusqueda.split(" ").length>1 ){
                               let tempSelectorText = argSelector.textoBusqueda.split(" ") ;
                               argSelector["$and"] = [] ;
                               tempSelectorText.forEach(function(elemText){
                                  let tempObjAnd = {textoBusqueda:{'$regex': elemText }} ;
                                  argSelector["$and"].push( tempObjAnd ) ;
                               }.bind(argSelector)) ;
                               delete argSelector.textoBusqueda ;
                            } else {
                                argSelector.textoBusqueda = {'$regex': tempText } ;
                            }
                        }
                        //
                        return this.promiseFindSortLimit(this.colleccion, argSelector) ;
                        //
                    }.bind(this))
                    .then(function(resulFind){
                        respPromiseGet(resulFind);
                    }.bind(this))
                    .catch(respRej) ;
            } catch(errget){ respRej(errget); }
        }.bind(this)) ;
    }
    //
}
//
module.exports.classDb       = DbDistribuidores ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new DbDistribuidores(argConfiguracion) ;
    return objMongoDbMl ;
}
//