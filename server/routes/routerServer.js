/*
*
*/
const routerAdmin     = require( './routerAdmin' )     ;
const routerAPI       = require( './routerAPI'   )     ;
const routerIndex     = require( './routerIndex' )     ;
const routerArticulos = require( './routerArticulos' ) ;
const routerErrores   = require( './routerErrores'   ) ;
const routerSitemap   = require( './routerSitemap'   ) ;
//
export const routesApp = (argApp,argConfig,argDb,argPassport) => {
   return new Promise(function(respOk,respRech){
      try {
         //
         argApp.use('/'      , routerIndex({...argConfig},argDb) ) ;
         argApp.use('/admin/', routerAdmin({...argConfig},argDb) ) ;
         argApp.use('/api/'  , routerAPI({...argConfig}  ,argDb)   ) ;
         argApp.use('/auth/' , argPassport.routes ) ;
         //
         respOk({
            rutaAdmin: routerAdmin,
            rutaAPI: routerAPI,
            rutaIndex: routerIndex,
            rutaErrores: routerErrores,
            rutaSitemap: routerSitemap,
            rutaProductos: routerArticulos
         }) ;
         //
      } catch(errRoutes){
          respRech(errRoutes) ;
      }
   }) ;
} ;
// 