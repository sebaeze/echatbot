/*
*  Agrega dinamicamente Path segun categoria de articulos
*/
const path            = require('path') ;
const router          = require('express').Router()   ;
const utilitario      = require('../lib/utiles').Utilitarios() ;
//
module.exports = (argDb,argApp,argConfig) => {
    //
    const defaultMetatags   = {...argConfig.metaTags.default} ;
    let   metatagsCatalogo  = {} ;
    //
    const agregarRutaArticulo = (argUrlArticulo,argTags,argFlagPlural) => {
        try {
            let urlArticulo    = argUrlArticulo + (argUrlArticulo.substr((argUrlArticulo.length-1),1)=="/" ? "" : "/" ) +":nombreArticulo" ;
            //
            argApp.get( argUrlArticulo , function(req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", true);
                //
                let catalogoNombre = argUrlArticulo.replace(/\//g," ").split(" ") ;
                if ( catalogoNombre.length>1 ){
                    argTags.title              = utilitario.capitalPlural(catalogoNombre[2],argFlagPlural) + ' | ' + defaultMetatags.title || '' ;
                    argTags.globalTituloPagina = 'Catalogo de '+utilitario.capitalPlural(catalogoNombre[2],argFlagPlural) ;
                    argTags.globalTituloPagina = argTags.globalTituloPagina.replace(/-/g,' ') ;
                }
                let tempMetatags      = Object.assign({...defaultMetatags},argTags) ;
                res.render( 'app.html', tempMetatags ) ;
                //
                let tempEstadisticaVisita = { _id: argUrlArticulo.replace('/','') , tipo: 'pagina', titulo: '', http:{...req.headers,...{query:req.query}} } ;
                argDb.estadisticas.addEstadistica( tempEstadisticaVisita )
                    .then(function(respDb){ /* no hago nada */  })
                    .catch(function(errDb){ console.log('....ERROR cargando estadistica: URL: '+req.baseUrl);console.dir(errDb);  })
            }.bind(this));
            //
            argApp.get( urlArticulo , function(req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", true);
                if ( !req.params.nombreArticulo ){ req.params.nombreArticulo=''; } ;
                let reqContenttype = req.headers['accept'] || req.headers['content-type'] || 'html' ;
                console.log('....nombreArticulo: '+req.params.nombreArticulo+' reqContenttype: '+reqContenttype) ;
                //
                if ( req.params.nombreArticulo ){
                    argTags.title              = utilitario.capitalPlural(req.params.nombreArticulo,argFlagPlural) + ' | ' + defaultMetatags.title || '' ;
                    argTags.globalTituloPagina = 'Detalle de producto '+utilitario.capitalPlural(req.params.nombreArticulo,argFlagPlural) ;
                    argTags.globalTituloPagina = argTags.globalTituloPagina.replace(/-/g,' ') ;
                }
                let tempMetatags      = Object.assign({...defaultMetatags},argTags) ;
                res.render( 'app.html', tempMetatags ) ;
                //
                let tempEstadisticaVisita = { _id: argUrlArticulo.replace('/','') , tipo: 'pagina', titulo: '', http:{...req.headers,...{query:req.query}} } ;
                argDb.estadisticas.addEstadistica( tempEstadisticaVisita )
                    .then(function(respDb){ /* no hago nada */  })
                    .catch(function(errDb){ console.log('....ERROR cargando estadistica: URL: '+req.baseUrl);console.dir(errDb);  })
            }.bind(this));
            //
        } catch(errPath){
            throw errPath ;
        }
    }
    //
    const procesaGrupo = (argArrayGrupo,argTipoGrupo) => {
        let outObjGrupo = {} ;
        try {
            let tempMetaTags     = argArrayGrupo.map((elemProd)=>{ return elemProd.id }) || [] ;
            tempMetaTags         = tempMetaTags.join(' ').replace(/\-/g," ") ;
            let metatagsCatalogo = {keywords:"",descripcion:"Contamos con las siguientes articulos: "} ;
            metatagsCatalogo.keywords    += " "+tempMetaTags ;
            metatagsCatalogo.descripcion += " "+tempMetaTags ;
            //
             for( let keyGrupo in argArrayGrupo ){
               let itemGrupo = argArrayGrupo[keyGrupo] ;
               outObjGrupo[itemGrupo.id] = itemGrupo ;
               agregarRutaArticulo( itemGrupo.url, metatagsCatalogo, (argTipoGrupo.indexOf("marca")!=-1 ? false : true ) ) ;
             }
             //
        } catch(errProc){ throw errProc; }
        return outObjGrupo ;
    } ;
    //
    return new Promise(function(respOk,respRech){
        try {
            //
            let tempObjResu = {marcas:{},categoria:{}} ;
            tempObjResu.marcas     = procesaGrupo( argConfig.metaTags.default.marcas     , "marca"     ) ;
            tempObjResu.categorias = procesaGrupo( argConfig.metaTags.default.categorias , "catalogo"  ) ;
            respOk( tempObjResu ) ;
            //
        } catch(errProm){
            respRech( errProm ) ;
        }
    }.bind(this)) ;
    //
}
//