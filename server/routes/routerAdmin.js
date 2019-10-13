/*
*
*/
const router            = require('express').Router()   ;
const path              = require('path') ;
//
module.exports = (argConfig,argDb) => {
  const defaultMetatags   = argConfig.metaTags.default ;
  const autenticado     = require( path.join(__dirname,'../auth/autenticado')  ).autenticado(argDb) ;
  //
  router.get(['/','/productos','/usuarios','/ventas'], autenticado, function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    const metatagsAdmin   = argConfig.metaTags.admin || {} ;
    let tempMetatags      = Object.assign({...defaultMetatags},{...metatagsAdmin}) ;
    tempMetatags.globalTituloPagina = "Administración de productos y usuarios" ;
    res.render( 'app.html', tempMetatags ) ;
    //res.sendFile( public+'/'+'app.html' );
    //
  });
  //
  return router ;
} ;
//