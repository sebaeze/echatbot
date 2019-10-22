/*
*   Definicion de todos los eventos de la app
*/
const emisorEventos    = require('./emisorEventos') ;
const eventos          = require('./NombreEventos') ;
//
module.exports = (argDb,argConfig) => {
    //
    emisorEventos.on(eventos.LOGIN, function(argUsr){
        //
        argDb.usuarios.get( {email:argUsr.email} )
            .then(function(respGet){
                if ( respGet.length>0 ){
                    respGet=respGet[0];
                } else {
                    respGet={
                        _id:argUsr.email,
                        ts_insert: argDb.usuarios.fechaPais()
                    };
                }
                if ( !respGet.accesos    ){ respGet.accesos=[]; }
                if ( !respGet.seguridad  ){ respGet.seguridad={}; }
                /*  */
                if ( !respGet.provider   ){ respGet.provider={}; }
                if ( respGet.provider && typeof respGet.provider=="string" ){ respGet.provider={}; }
                if ( argUsr.provider && respGet.provider[argUsr.provider] && typeof respGet.provider[argUsr.provider]=="string" ){
                    delete respGet.provider[argUsr.provider] ;
                }
                if ( argUsr.provider && !respGet.provider[argUsr.provider] ){
                    respGet.provider[argUsr.provider]={};
                    respGet.provider[argUsr.provider]={
                        tipo: argUsr.provider,
                        ...(argUsr._json ? argUsr._json : argUsr )
                    } ;
                    delete argUsr.provider ;
                    delete argUsr._raw ;
                    delete argUsr._json ;
                }
                respGet.accesos.push({ tipo:'login',timestamp:argDb.usuarios.fechaPais() }) ;
                let tempUserMerge    = Object.assign(respGet,argUsr) ;
                return argDb.usuarios.add( tempUserMerge )
            }.bind(this))
            .then((resuMerge)=>{
                console.log('.....Termine merge de usuario despues de login:: OK') ;
            })
            .catch(function(respErr){
                console.log('....ERROR:: En merge usuario / login:: ') ;
                console.dir(respErr) ;
            }.bind(this)) ;
        //
    }.bind(this))  ;
    //
}
//