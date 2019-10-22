/*
*
*/
import { autenticadoFn }     from  '../auth/autenticado' ;
const router            = require('express').Router()   ;
//
module.exports = (argConfig,argDb) => {
  const defaultMetatags   = argConfig.metaTags.default ;
  const autenticado   = autenticadoFn( argDb ) ;
  //
  router.get(['/','/bots','/users','/account'], autenticado, function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    console.log('.....estoy en auth//nose') ;
    //
    const metatagsAdmin   = argConfig.metaTags.admin || {} ;
    let tempMetatags      = Object.assign({...defaultMetatags},{...metatagsAdmin}) ;
    tempMetatags.globalTituloPagina = "Administración de productos y usuarios" ;
    res.render( 'admin.html', tempMetatags ) ;
    //
  });
  //
  return router ;
} ;
//