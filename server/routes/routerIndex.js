/*
*
*/
const express           = require('express') ;
const router            = require('express').Router()   ;
const utilitario        = require('../lib/utiles').Utilitarios() ;
const fnEmail           = require('../lib/emailEnviar').email ;
const fs                = require('fs') ;
const path              = require('path') ;
const React             = require("react") ;
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
module.exports = (argConfig,argDb,argCatalogoMarcas) => {
  const defaultMetatags   = argConfig.metaTags.default ;
  //
  router.use('/', express.static( path.join(__dirname,'../../dist') , opciones ) );
  //
  try {
    //
    //let theHtml       = fs.readFileSync( path.join(__dirname,'../../dist/app.html') ) ;
    /*
    const hbsTemplate = hbs.compile(theHtml);
    const reactComp   = renderToString(<App />);
    const htmlToSend  = hbsTemplate({ reactele: reactComp });
    console.dir(htmlToSend) ;
    */
    //
    /*
    const App = require( path.join(__dirname,'../../dist/mainApp') ).App ;
    theHtml = theHtml.replace(
      '<div id="app"></div>',
      `<div id="app">${ReactDOMServer.renderToString( App() )}</div>`
    ) ;
    console.dir(theHtml) ;
    */
    //
  } catch(errComp){
    console.dir(errComp) ;
    console.log('....error compilando REACT') ;
  }
  //
  router.get(['/','/404','/about','/error','/contact','/services','/prices','/login'], function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    res.render( 'app.html', defaultMetatags ) ;
    console.log('....: req.url: '+req.url+' baseUrl: '+req.baseUrl+' originalUrl: '+req.originalUrl+' path: '+req.path+';');
    let tempUrl = req.url || req.baseUrl || 'inicio' ;
    let tempEstadisticaVisita = { _id: tempUrl, tipo: 'pagina', titulo: '', http:{...req.headers,...{query:req.query}} } ;
    argDb.estadisticas.addEstadistica( tempEstadisticaVisita )
        .then(function(respDb){ /* no hago nada */  })
        .catch(function(errDb){ console.log('....ERROR cargando estadistica: URL: '+req.baseUrl);console.dir(errDb);  })
    //
  });
  //
  router.get('/auth', function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    res.render( 'admin.html', {...defaultMetatags} ) ;
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