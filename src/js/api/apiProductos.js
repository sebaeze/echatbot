/*
*
*/
import moment                  from 'moment-timezone'  ;
import ls                      from 'local-storage'    ;
import {PARAMETROS,obj2qryString,opcionesPOST}            from '../utils/parametros'       ;
/*
*
*/
const apiProductos = {
    productosNuevos :'/productos/api',
    queryProductos: '/api/qryProductos',
    portfolioProductos: '/productos/portfolio',
    apiCatalogoURLs:'/catalogoUrl',
    APIsincronizacionMercadolibre: '/sincronizacionMercadolibre'
}
//
const addProductos = (arrayProductos) => {
    return new Promise(function(respOk,respRech){
        try {
            if ( typeof arrayProductos!=="string" ){ arrayProductos=JSON.stringify(arrayProductos); }
            let postOpt = {...opcionesPOST} ;
            postOpt.body = arrayProductos ;
            //
            fetch( apiProductos.productosNuevos ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: ADD Productos nuevos. Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errAddprod){
            console.dir(errAddprod) ;
            respRech(  errAddprod ) ;
        }
    }.bind(this)) ;
}
//
const sincronizarMercadolibre = (argOpciones=null) => {
    return new Promise(function(respOk,respErr){
        try {
            let postOpt = {...opcionesPOST} ;
            postOpt.body = argOpciones ;
            //
            fetch( apiProductos.APIsincronizacionMercadolibre ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: sincronizarMercadolibre:: Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respErr(respRechaz) ; }) ;
        } catch(errSincc){ respErr(errSincc); }
    }.bind(this)) ;
}
//
const deleteProductos = (arrayProductos) => {
    return new Promise(function(respOk,respRech){
        try {
            if ( typeof arrayProductos!=="string" ){ arrayProductos=JSON.stringify(arrayProductos); }
            let postOpt = {...opcionesPOST} ;
            postOpt.method = 'DELETE' ;
            postOpt.body   = arrayProductos ;
            //
            fetch( apiProductos.productosNuevos ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: ADD Productos nuevos. Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errAddprod){
            console.dir(errAddprod) ;
            respRech(  errAddprod ) ;
        }
    }.bind(this)) ;
}
//
const getProductosPortfolio = () => {
    return new Promise(function(respProdMl,respRej){
       try {
         //
         //fetch( apiProductos.todosLosProductos ,{method:'GET',accept:'application/json',contentType:'application/json'})
         apiProductos.method = 'GET' ;
         apiProductos.body = null ;
         //
         fetch( apiProductos.portfolioProductos ,{method:'GET',accept:'application/json',contentType:'application/json'})
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: Buscando lista de productos. Http Status: "+response.status+'.') ;
                }
            })
            .then(function(respDatos){
                let objResp = {} ;
                for( let keyPortfolio in respDatos ){
                    let arratProds = respDatos[keyPortfolio] ;
                    let tempObj    = {}
                    for(let posArr=0;posArr<arratProds.length;posArr++){
                        tempObj[ arratProds[posArr]._id ] = arratProds[posArr] ;
                    }
                    objResp[keyPortfolio] = tempObj ;
                }
                respProdMl(objResp) ;
            })
            .catch(function(respRechaz){
                respRej(respRechaz) ;
            }) ;
            //
       } catch(errListProd){
           respRej(errListProd) ;
       }
    }) ;
}
//
const queryProductos = (argQry) => {
    return new Promise(function(respDatos,respRech){
        try {
          //
          if ( !argQry.limite ){ argQry.limite=50; }
          let urlBusqueda = apiProductos.queryProductos + obj2qryString(argQry) ;
          //
          fetch( urlBusqueda ,{method:'GET',accept:'application/json',contentType:'application/json'})
             .then(function(response){
                 if (response.status>=200 & response.status<=400) {
                     return response.json() ;
                 } else {
                     throw new Error("ERROR: Buscando lista de productos. Http Status: "+response.status+'.') ;
                 }
             })
             .then((argJson     ) => { respDatos(argJson) ; })
             .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
             //
        } catch(errListProd){
            respRech(errListProd) ;
        }
     }) ;
}
//
const getProductosCategoria = (argQry) => {
    return new Promise(function(respDatos,respRech){
        try {
          //
          if ( !argQry.limite ){ argQry.limite=50; }
          let urlBusqueda = apiProductos.queryProductos + obj2qryString(argQry) ;
          //
          fetch( urlBusqueda ,{method:'GET',accept:'application/json',contentType:'application/json'})
             .then(function(response){
                 if (response.status>=200 & response.status<=400) {
                     return response.json() ;
                 } else {
                     throw new Error("ERROR: Buscando lista de productos. Http Status: "+response.status+'.') ;
                 }
             })
             .then((argJson     ) => { respDatos(argJson) ; })
             .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
             //
        } catch(errListProd){
            respRech(errListProd) ;
        }
     }) ;
}
//
const fetchApiCatalogoMarcas = (argFCM) => {
    return new Promise(function(respDatos,respRech){
        try {
            fetch( apiProductos.apiCatalogoURLs ,{method:'GET',accept:'application/json',contentType:'application/json'})
             .then(function(response){
                 if (response.status>=200 & response.status<=400) {
                     return response.json() ;
                 } else {
                     throw new Error("ERROR::fetchApiCatalogoMarcas:: Http Status: "+response.status+'.') ;
                 }
             })
             .then((argJson     ) => { respDatos(argJson) ; })
             .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
        } catch(errFC){ respRech(errFC); }
    }.bind(this)) ;
}
//
const getTodasCategorias = () => {
    return new Promise(function(respDatos,respRech){
        try {
          //
          let tempCategoriasMarcas = ls( PARAMETROS.SESSION.CATEGORIAS_MARCAS )  ;
          if ( tempCategoriasMarcas ){
            let fechAnt = moment( tempCategoriasMarcas.timestamp ) ;
            let fechACt = moment( new Date().toISOString() ) ;
            let diferenciaMinutos = fechACt.diff(fechAnt, 'minutes') ;
            if ( diferenciaMinutos>PARAMETROS.SESSION.TIEMPO_SINCRONIZACION_MINUTOS ){
                console.log('....Cantidad de minutos supera el maximo. Por eso se va a ejecutar fetch') ;
                console.log(new Date().toISOString()+'......maximo tiempo sincronizacion. Maximo: '+PARAMETROS.SESSION.TIEMPO_SINCRONIZACION_MINUTOS) ;
                tempCategoriasMarcas = null ;
            }
          }
          //
          if ( tempCategoriasMarcas ){
            respDatos( tempCategoriasMarcas.catalogo ) ;
          } else {
            console.log(new Date().toISOString()+'....fetch catalogo.') ;
            fetchApiCatalogoMarcas()
                .then(function(catMarcas){
                    ls(PARAMETROS.SESSION.CATEGORIAS_MARCAS,{timestamp: new Date().toISOString(),catalogo:{...catMarcas}}) ;
                    respDatos(catMarcas) ;
                }.bind(this))
                .catch((errCAtMar) => { respRech(errCAtMar);   }) ;
          }
          //
        } catch(errListProd){
            respRech(errListProd) ;
        }
     }) ;
}
 //
 const postProductoSeleccionado = () => { }
 //
export const productos = {
       addProductos: addProductos,
       deleteProductos: deleteProductos,
       get: queryProductos,
       getProductosPortfolio: getProductosPortfolio,
       getProductosCategoria: getProductosCategoria,
       productosSeleccionado: postProductoSeleccionado,
       getTodasCategorias: getTodasCategorias,
       sincronizarMercadolibre: sincronizarMercadolibre
 }