/*
*
*/
import { autenticadoFn }     from  '../auth/autenticado' ;
const router                 = require('express').Router()   ;
//
module.exports = (argConfig,argDb) => {
  const defaultMetatags   = argConfig.metaTags.default ;
  const autenticado   = autenticadoFn( argDb ) ;
  //
  router.get(['/','/account','/account/:seccion','/auth','/bots','/users'], autenticado, function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    const metatagsAdmin   = argConfig.metaTags.admin || {} ;
    let tempMetatags      = Object.assign({...defaultMetatags},{...metatagsAdmin}) ;
    tempMetatags.globalTituloPagina = "Account" ;
    res.render( 'admin.html', tempMetatags ) ;
    //
  });
  /*
  router.get('/auth', function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    res.render( 'admin.html', {...defaultMetatags} ) ;
    //
  });
  */
  //
  return router ;
} ;
//