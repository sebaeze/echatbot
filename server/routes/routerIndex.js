/*
*
*/
const express            = require('express') ;
const router             = require('express').Router()   ;
const { renderToString } = require("react-dom/server");
const fnEmail            = require('../lib/emailEnviar').email ;
const path               = require('path') ;
//
import expressStaticGzip   from "express-static-gzip" ;
let App = null ;
let SSR = null ;
//
try {
  console.log('....voy para readddd ') ;
  App                 = require("../../dist/mainAppSSR");
  console.log('....voy para render2String ') ;
  SSR                 = renderToString(App) ;
} catch(errSSR){
  console.log('....error haciendo render2String:: errSSR: ',errSSR) ;
}
//
if ( !process.env.AMBIENTE ){ process.env.AMBIENTE="dev"; }
//
let opciones = {
  dotfiles: 'ignore',etag: false,extensions: [],index: false,maxAge: '1d' ,redirect: false,
  setHeaders: function (res, path, stat) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization')");
      res.set('Access-Control-Allow-Methods', '*');
      res.set("Access-Control-Allow-Credentials", true);
      res.set('Connection', 'Keep-Alive') ;
      }
  } ;
/*
*
*/
module.exports = (argConfig,argDb) => {
  const defaultMetatags   = argConfig.metaTags.default ;
  const CONFIG_API        = argConfig.API[ (process.env.AMBIENTE ? process.env.AMBIENTE : 'dev' )  ] ;
  //
  // router.use('/', function(req,res,next){ console.log('....estoy en static::: '); next();},express.static( path.join(__dirname,'../../dist') , opciones ) );
  try {
    console.log('....CONFIG_API.PATH_STORAGE: ',CONFIG_API.PATH_STORAGE) ;
    if ( !require('fs').existsSync( CONFIG_API.PATH_STORAGE ) ){
      require('fs').mkdirSync( CONFIG_API.PATH_STORAGE );
    }
  } catch(errPathStorage){
    console.log('....ERROR: Static path storage files: ',errPathStorage) ;
    throw errPathStorage ;
  }
  router.use('/', express.static( CONFIG_API.PATH_STORAGE , opciones ) );
  //
  router.use('/', expressStaticGzip( path.join(__dirname,'../../dist') ,
    {
      index: false,
      enableBrotli: true,
      orderPreference: ['br', 'gz'],
      setHeaders: function (res, path) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
      }
    })
  );
  //
  router.get('/logout',function(req,res,next){
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    if ( req.user ){
      req.session.destroy(function (err) {
        console.log('....../logout:: err: ');
        console.dir(err) ;
        res.redirect('/') ;
      });
    } else {
      res.redirect('/') ;
    }
    //
  }) ;
  /*
  router.get('/:params', function(req, res, next) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    console.log('....me voy por (00000) params: ',req.params) ;
    next() ;
    //
  });
  */
  //
  router.get(['/','/404','/about','/error','/contact','/services','/prices'], function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    //console.log('....me voy por (A) ') ;
    // res.render( 'app.html', defaultMetatags ) ;
    // res.render( 'app.html', defaultMetatags ) ;
    res.send(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Webpack SSR Demo</title>
          <meta charset="utf-8" />
        </head>
        <body>
          <div id="app">${SSR}</div>
          <script src="./index.js"></script>
        </body>
      </html>`
    ) ;
    //
  });
   // Login no requiere autenticar, sino entra en Loop
   router.get('/login', function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    console.log('...estoy en /login') ;
    //
    const metatagsAdmin   = argConfig.metaTags.admin || {} ;
    let tempMetatags      = Object.assign({...defaultMetatags},{...metatagsAdmin}) ;
    tempMetatags.globalTituloPagina = "Account" ;
    res.render( 'admin.html', tempMetatags ) ;
    //
  });
  //
  router.post('/consulta', function(req, res) {
    //
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("access-Control-Allow-Credentials", true);
    //
    enviarEmail( req.body )
        .then(function(respEmail){
          return argDb.consultas.add( req.body ) ;
        }.bind(res))
        .then(function(respAddCons){
          let tempUser = {_id:respAddCons.email,email:respAddCons.email,nombre:respAddCons.name||''}
          return argDb.usuarios.add( tempUser ) ;
        }.bind(res))
        .then(function(respDb){
          res.status(200) ;
          res.json( respEmail ) ;
        })
        .catch(function(respErr){
          res.status(500) ;
          res.json( respErr ) ;
        }.bind(res))
    //
  });
  //
  router.post('/estadisticas', function(req, res) {
    //
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("access-Control-Allow-Credentials", true);
    //
    let tempEstadisticas = Object.assign(req.body,{http:req.headers}) ;
    argDb.estadisticas.addEstadistica( tempEstadisticas )
        .then(function(respDb){
          res.status(200) ;
          res.json( req.body ) ;
        })
        .catch(function(respErr){
          console.dir(respErr) ;
          res.status(500) ;
          res.json( respErr ) ;
        }.bind(res))
    //
  });
  //
  const sendGmail   = fnEmail( {...argConfig} ) ;
  const enviarEmail = (argBody) => {
    return new Promise(function(respResu,respRej){
      try {
          // sendGmail
          let muestraAmbiente = (process.env.AMBIENTE && process.env.AMBIENTE=='produccion') ? '' : 'TEST - ' ;
          sendGmail({
            subject: muestraAmbiente+argBody.subject ,
            html: '<p style="font-weight:bold;font-size:18px;">Nueva consulta de: '+(argBody.name||argBody.nombre)+' ( '+argBody.email+' )</p><p>'+argBody.message+'</p>'
          },
          function (err, res) {
            if ( err ){
              console.log('....ERROR enviando email: ') ;
              console.dir(err) ;
              respRej(err) ;
            } else {
              respResu('* [example 1.1] send() callback returned: err:', err, '; res:', res) ;
            }
          }) ;
        //
      } catch(errMsg){
        respRej(errMsg) ;
      }
    }.bind(this)) ;
  }
  //
  if ( process.env.AMBIENTE!='produccion' && process.env.AMBIENTE!="dev" ){
    enviarEmail( {subject:'Falta variable de ambiente AMBIENTE',message:''}, argConfig.email.emailSoporte )
            .then(function(respEmail){ /*  */ })
            .catch(function(respErr){ console.dir( respErr ) ; }) ;
  }
  //
  return router ;
} ;
//