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
  /*
  router.get(['/account','/account/:seccion','/auth','/bots','/edit','/edit/:idChatbot','/train','/train/:idChatbot','/users'],
  function(req, res, next) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    console.log('....me voy por (b):: req.params: ',req.params,';') ;
    next() ;
  }) ;
  */
  //
  router.get(['/account','/account/:seccion','/auth','/bots','/edit','/edit/:idChatbot','/train','/train/:idChatbot','/users'], autenticado, function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    const metatagsAdmin   = argConfig.metaTags[String(req.originalUrl).toLowerCase()]  || argConfig.metaTags.admin || {} ;
    let tempMetatags      = Object.assign({...defaultMetatags},{...metatagsAdmin}) ;
    // tempMetatags.globalTituloPagina = "Account" ;
    res.render( 'admin.html', tempMetatags ) ;
    //
  });
  //
  router.get(['/account/:seccion/:email/:id'], function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    const metatagsAdmin   = argConfig.metaTags[String(req.originalUrl).toLowerCase()]  || argConfig.metaTags.admin || {} ;
    let tempMetatags      = Object.assign({...defaultMetatags},{...metatagsAdmin}) ;
    // tempMetatags.globalTituloPagina = "Account" ;
    res.render( 'admin.html', tempMetatags ) ;
    //
  });
  //
  return router ;
} ;
//