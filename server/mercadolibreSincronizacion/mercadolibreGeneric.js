/*
*   Busqueda de informacion de mercadolibre
*/
//const requestPromise  = require('request-promise') ;
const path            = require('path')            ;
//
class MercadolibreGeneric {
    constructor( argConfigML ){
        if ( !argConfigML ){ argConfigML={}; }
        this.appId    = argConfigML.AppId       || false ;
        this.secret   = argConfigML.secret      || false ;
        this.siteId   = argConfigML.siteId      || 'MLA' ;
        this.tokenId  = argConfigML.access_token || argConfigML.accessToken || false ;
        this.refreshToken    = argConfigML.refreshToken || false ;
        this.requestPromise  = require('request-promise') ;

    }
    //
    buscaTodosOffsetMercadolibre(argDatosOffset0,argCBpromise,argBuscado){
        return new Promise(function(respDatos,respRej){
            try {
                //
                let self         = this ;
                let argTotal     = argDatosOffset0.paging.total ;
                let argLimit     = argDatosOffset0.paging.limit ;
                if ( argLimit>=argTotal ){
                    return( argDatosOffset0.results ) ;
                }
                //
                let offsetFaltan = argTotal/argLimit ;
                offsetFaltan     = Math.ceil( parseInt(offsetFaltan) ) ;
                let arrayDatos     = argDatosOffset0.results || [] ;
                let arrayPromises  = [] ;
                //
                let offSetPosicion = argDatosOffset0.length ? argDatosOffset0.length : 0 ;
                for(let posProm=1;posProm<=offsetFaltan;posProm++){
                    offSetPosicion++ ;
                    if ( offSetPosicion>argTotal ){
                        let faltantes   = offSetPosicion - argTotal ;
                        offSetPosicion -= faltantes ;
                    }
                    arrayPromises.push( argCBpromise(argBuscado,offSetPosicion,argLimit) ) ;
                    offSetPosicion += argLimit ;
                }
                //
                Promise.all( arrayPromises )
                        .then(function(respPromises){
                            for( let posArr=0;posArr<respPromises.length;posArr++){
                                arrayDatos = arrayDatos.concat( respPromises[posArr].results ) ;
                            }
                            respDatos(arrayDatos) ;
                        }.bind(this))
                        .catch(errorAll => {
                            console.log('buscaTodosItemsMl::ERROR: Algo fallo en las Promises.All:: Length: '+arrayPromises.length+';')  ;
                            console.dir(errorAll) ;
                            respRej(errorAll) ;
                        }) ;
                //
            } catch(errTodos){
                respRej(errTodos) ;
            }
        }.bind(this)) ;
    }
    // Verifica en cada metodo si se pasaron como argumento nuevas credenciales
    verificaCredenciales(argObjCredenciales){
        try{
            //
            if ( typeof argObjCredenciales!='object' ){ return false ; }
            //
            if ( argObjCredenciales.access_token ){
                this.tokenId = argObjCredenciales.access_token ;
            }
            if ( argObjCredenciales.appId || argObjCredenciales.AppId ){
                this.appId = argObjCredenciales.appId || argObjCredenciales.AppId;
            }
            if ( argObjCredenciales.appSecret || argObjCredenciales.secret ){
                this.secret = argObjCredenciales.appSecret || argObjCredenciales.secret;
            }
        } catch(errCredenciales){
            throw errCredenciales ;
        }
    }
    //
}
//
module.exports.class    = MercadolibreGeneric ;
module.exports.instance = (argConfig) => {
    const mlApi = new MercadolibreData(argConfig) ;
    return mlApi ;
}