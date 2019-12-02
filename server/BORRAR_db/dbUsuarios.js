/*
*
*/
const Db              = require('./db').classDb        ;
const schemaUsuarios  = require('./modelos/schemaUsuarios') ;
//
class dbUsuarios extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'usuarios' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaUsuarios) ;
    }
    //
    add(argObjUser){
        return new Promise(function(respData,respRej){
            try {
                //
                if ( !Array.isArray(argObjUser) ){ argObjUser=new Array(argObjUser);  } ;
                if ( Array.isArray(argObjUser) && argObjUser.length==0 ){ return([]); } ;
                let flagUsrSinID = false ;
                for( let posUsr=0;posUsr<argObjUser.length;posUsr++){
                    if ( !argObjUser[posUsr]._id ){
                        if ( argObjUser[posUsr].email || argObjUser[posUsr].id ){
                            argObjUser[posUsr]._id = argObjUser[posUsr].email || argObjUser[posUsr].id ;
                        } else {
                            flagUsrSinID = true ;
                        }
                    }
                }
                if ( flagUsrSinID==true ){
                    respRej( {error: 'No existe campo _id en objeto',elemento:argObjUser} ) ;
                } else {
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        let arrayPromises = [] ;
                        argObjUser.forEach(elemUsr => {
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
                        respData( argObjUser ) ;
                    }.bind(this))
                    .catch(respRej) ;
                }
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    get(argObjBusqueda){
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
    mergeLoginUser(argUsr){
        return new Promise(function(respOk,respRej){
            try {
                //
                console.log('.....mergeLoginUser:: argUsr: ') ;
                console.dir(argUsr) ;
                //
                this.get( {email:argUsr.email} )
                    .then(function(respGet){
                        let tempUserMerge = {} ;
                        if ( respGet.length>0 ){
                            tempUserMerge=respGet[0];
                        } else {
                            /* respGet={
                                _id:argUsr.email,
                                ts_insert: this.fechaPais()
                            }; */
                            tempUserMerge = this.mergeUserInfoProvider( argUsr ) ;
                            tempUserMerge.accesos = [] ;
                        }
                        /*
                        if ( !respGet.accesos    ){ respGet.accesos=[]; }
                        if ( !respGet.seguridad  ){ respGet.seguridad={}; }
                        if ( !respGet.provider   ){ respGet.provider={}; }
                        if ( respGet.provider && typeof respGet.provider=="string" ){ respGet.provider={}; }
                        if ( argUsr.provider && respGet.provider[argUsr.provider] && typeof respGet.provider[argUsr.provider]=="string" ){
                            delete respGet.provider[argUsr.provider] ;
                        }
                        if ( argUsr.provider && !respGet.provider[argUsr.provider] ){
                            let userMergeProvider = {...respGet} ;
                            switch(argUsr.provider){
                                case 'google': mergeGoogleUserInfo({...respGet},)
                                break ;
                                case 'facebook':
                                break ;
                                case 'mercadolibre':
                                break ;
                                default:
                                break ;
                            } ;
                            respGet.provider[argUsr.provider]={};
                            respGet.provider[argUsr.provider]={
                                tipo: argUsr.provider,
                                ...(argUsr._json ? argUsr._json : argUsr )
                            } ;
                            delete argUsr.provider ;
                            delete argUsr._raw ;
                            delete argUsr._json ;
                        }
                        */
                       //tempUserMerge               = Object.assign(respGet,argUsr) ;
                        tempUserMerge.accesos.push({ tipo:'login',timestamp:this.fechaPais() }) ;
                        tempUserMerge.ts_last_login = this.fechaPais() ;
                        //
                        return this.add( tempUserMerge ) ;
                        //
                    }.bind(this))
                    .then((resuMerge)=>{
                        console.log('.....mergeLoginUser:: Termine merge de usuario -> OK') ;
                        respOk(resuMerge) ;
                    })
                    .catch(function(respErr){
                        console.log('....ERROR:: mergeLoginUser: En merge usuario / login:: ') ;
                        console.dir(respErr) ;
                        respRej(respErr) ;
                    }.bind(this)) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    mergeUserInfoProvider(argInfoUserLogin){
        let outInfo = {} ;
        try {
            outInfo._id  = argInfoUserLogin.email || argInfoUserLogin.mail || argInfoUserLogin.id || argInfoUserLogin.name || "*** ERROR *** " ;
            //outInfo.name = (typeof argInfoUserLogin.name=="string") ? argInfoUserLogin.name :
            /*
            if ( !outInfo.accesos    ){ outInfo.accesos=[]; }
            if ( !outInfo.seguridad  ){ outInfo.seguridad={}; }
            if ( !outInfo.provider   ){ outInfo.provider={}; }
            //
            if ( respGet.provider && typeof respGet.provider=="string" ){ respGet.provider={}; }
            if ( argUsr.provider && respGet.provider[argUsr.provider] && typeof respGet.provider[argUsr.provider]=="string" ){
                delete respGet.provider[argUsr.provider] ;
            }
            */
            if ( argInfoUserLogin.provider ){
                switch(argInfoUserLogin.provider){
                    case 'google':
                        outInfo.email    = Array.isArray(argInfoUserLogin.emails) ? argInfoUserLogin.emails[0].value : '' ;
                        outInfo._id      = outInfo.email ;
                        outInfo.name     = argInfoUserLogin.name.givenName || '' ;
                        outInfo.lastName = argInfoUserLogin.name.familyName || '' ;
                        outInfo.fullName = argInfoUserLogin.displayName || '' ;
                        outInfo.fotos    = [] ;
                        argInfoUserLogin.photos.forEach(function(eleFF,eleIDX){
                            outInfo.fotos.push({ id: eleIDX , url: eleFF.value }) ;
                        }.bind(outInfo)) ;
                        //
                    break ;
                    case 'facebook':
                    break ;
                    case 'mercadolibre':
                    break ;
                    default:
                    break ;
                } ;
                outInfo.provider = {} ;
                outInfo.provider[argInfoUserLogin.provider] = {...argInfoUserLogin} ;
                //
            }
        } catch(errMU){
            console.dir(errMU) ;
        }
        return outInfo ;
    }
    //
    accesos(argEmail){
        return new Promise(function(respData,respRej){
            try {
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return this.colleccion.find( {email:argEmail}, "email accesos", {lean: true} ).exec() ;
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
    getClientes(argSellerId,argOpciones={soloId:true} ){
        return new Promise(function(respData,respRej){
            try {
                //
                let tempIdSeller = (typeof argSellerId=='object') ? argSellerId.id||argSellerId._id : argSellerId ;
                console.log('getClientes::tempIdSeller: '+tempIdSeller+';') ;
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        let selector = {_id: parseInt(tempIdSeller)} ;
                        return this.coneccion.collection( this.collectionNombre )
                                            .findOne( selector, {projection:{_id:0, ventasRealizadas:1 }} ) ;
                    }.bind(this))
                    .then(function(arrayVentasRealizadas){
                        //this.coneccion.cerrar() ;
                        if ( argOpciones.soloId==true ){
                            return this.parsearClientesVentas(arrayVentasRealizadas.ventasRealizadas) ;
                        } else {
                            return arrayVentasRealizadas.ventasRealizadas ;
                        }
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
    getVisitas(argSellerId){
        return new Promise(function(respData,respRej){
            try {
                //
                let tempIdSeller = (typeof argSellerId=='object') ? argSellerId.id||argSellerId._id : argSellerId||false ;
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        let selector = {} ;
                        if ( tempIdSeller ){
                            selector = {_id: parseInt(tempIdSeller)} ;
                        }
                        return this.coneccion.collection( this.collectionNombre )
                                            .find( selector, {projection:{_id:0, nickname:1, country_id:1, visitas:1 }} )
                                            .toArray() ;
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
    parsearClientesVentas(argArrayVentas){
        let objClientes = {} ;
        try {
            for(let posVenta=0;posVenta<argArrayVentas.length;posVenta++){
                let objVenta = argArrayVentas[posVenta] ;
                if ( !objClientes[objVenta.buyer.id] ){
                    objClientes[objVenta.buyer.id] = objVenta.buyer ;
                }
            }
        } catch(errParsearCli){
            throw errParsearCli ;
        }
        return Object.keys(objClientes) ;
    }
}
//
module.exports.classDb       = dbUsuarios ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new dbUsuarios(argConfiguracion) ;
    return objMongoDbMl ;
}
//