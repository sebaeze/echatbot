/*
*
*/
const express          = require('express');
const app              = express();
const bodyParser       = require('body-parser') ;
const cookieParser     = require('cookie-parser')   ;
const session          = require('express-session') ;
const MongoStore       = require('connect-mongo')(session);
const utiles           = require('./lib/utiles').Utilitarios() ;
const mustacheExpress  = require('mustache-express') ;
const APP_AMBIENTES    = require('../build_config/config.js').APP_AMBIENTES ;
//
const https            = require('https') ;
const path             = require('path')  ;
const fs               = require('fs')    ;
//
import { bases as dbClass }    from '@sebaeze/echatbot-mongodb' ;
import { routesApp }           from './routes/routerServer' ;
import configuracionApp        from './config/general.json'  ;
//
if ( process.env.GLOBAL_GOOGLE_ANALYTICS ){
  configuracionApp.metaTags.default.GLOBAL_GOOGLE_ANALYTICS = process.env.GLOBAL_GOOGLE_ANALYTICS ;
}
//
if ( !process.env.AMBIENTE ){ process.env.AMBIENTE=APP_AMBIENTES.DEVELOPMENT; }
process.env.AMBIENTE = String(process.env.AMBIENTE).trim() ;
console.log('\n *** AMBIENTE: "'+process.env.AMBIENTE+'" \n') ;
//
let configDb = configuracionApp.database[process.env.AMBIENTE || APP_AMBIENTES.DEVELOPMENT ] ;
const db               = dbClass( configDb ) ;
//
const configPassport   = require( './auth/passportConfig'  ).passportConfig ;
const Eventos          = require( './eventos/EventosApp'  ) ;
/*
*   Configuracion de Passport
*/
//
Eventos(db,configuracionApp) ;
//
app.use(cookieParser()) ;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//
app.disable('x-powered-by');
app.disable('etag');
//
// app.enable('trust proxy');
//
if ( process.env.AMBIENTE==APP_AMBIENTES.PRODUCCION ){
  /*
  app.use(
        require('express-naked-redirect')({
          subDomain: 'www',
          protocol: 'https'
        })
  ) ;
  */
  //
  app.all(/.*/, function(req, res, next) {
    var host = req.header("host");
    if ( String(host).toUpperCase().indexOf("WWW")>-1 ) {
        if ( String(req.protocol).toUpperCase().indexOf("HTTPS")>-1 ){
            next();
        } else {
            res.redirect(301, "https://" + host);
        } ;
    } else {
        console.log("...voy a redirect:: host: ",host," indexof: ",(String(host).toUpperCase().indexOf("WWW")),";");
      res.redirect(301, "https://www." + host);
    } ;
  }) ;
  //
} ;
/*
*   Rutas
*/
try {
    //
    app.all('*', function(req, res, next) {
      //
      console.log("...req.protocol: ",req.protocol," match: ",(req.protocol.match(/^https\..*/i)),";") ;
      var hhost = (req.headers.host && String(req.headers.host).indexOf(':')!=-1) ? req.headers.host.split(":")[0] : req.headers.host ;
      if ( process.env.AMBIENTE==APP_AMBIENTES.PRODUCCION && String(hhost).toUpperCase().indexOf('WAIBOC.COM')==-1 ){
          console.log('\n\n ***************** \n *** (B) ALGUN LOGI HIZO REDIRECT \n hhost: '+hhost+' \n****************** ');
          res.redirect('https://www.google.com/' ) ;
          console.log('...ya deberia haber echo redirect aca....  ') ;
      } else {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header("credentials","same-origin") ;
        next() ;
      }
      //
    }) ;
    //
    app.use(session({
      name:'ckwaibocwebsite',secret: 'wsx22wsx',cookie: {path: '/',httpOnly: true,maxAge: (2 * 24 * 60 * 60 * 1000) },proxy: true, resave: true,saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: db.chatbot.getConeccion().connection,
        collection:'sessionswebsite'
      })
    }));
    let passportConfigured = configPassport(  configuracionApp.passport[process.env.AMBIENTE||APP_AMBIENTES.DEVELOPMENT] , app, db )  ;
    //
    routesApp(app,configuracionApp,db,passportConfigured)
      .then((finRutas)=>{
        //
        mustacheExpress.escape     = function (value){ return value; } ;
        mustacheExpress.escapeHtml = function (value){ return value; } ;
        //
        app.engine('html', mustacheExpress() );
        app.set('view engine', 'html');
        app.set('views', utiles.getDistPath() );
        //
        return finRutas ;
      })
      .then((finEngine)=>{
        app.use( finEngine.rutaErrores ) ;
        if ( process.env.AMBIENTE==APP_AMBIENTES.PRODUCCION ){
            var httpPort = 80 ;
            const http   = express() ;
            //
            http.get('*', function(req, res) {
                var hhost = (req.headers.host && String(req.headers.host).indexOf(':')!=-1) ? req.headers.host.split(":")[0] : req.headers.host ;
                if ( String(hhost).toUpperCase().indexOf('WAIBOC.COM')==-1 ){
                  console.log('\n\n ***************** \n *** ALGUN LOGI HIZO REDIRECT \n hhost: '+hhost+' \n****************** ');
                  res.redirect('https://www.google.com/' ) ;
                } else {
                  console.log('....voy a redirect --> '+ hhost + req.url+';') ;
                  res.redirect('https://' + hhost + req.url ) ;
                }
            }) ;
            http.listen( httpPort , function(){
              console.log('....http server listening in port '+httpPort+'.') ;
            });
            //
            var puerto      = process.env.PORT || 443  ;
            var privateKey  = fs.readFileSync( path.join(__dirname,'./cert/privkey.pem') );
            var certificate = fs.readFileSync( path.join(__dirname,'./cert/cert.pem') );
            //
            app.get('*', function(req, res) {
              res.set('access-Control-Allow-Origin', '*');
              res.set('access-Control-Allow-Methods', '*');
              res.setHeader("Access-Control-Allow-Credentials", true);
              console.log('...(DDDD) req.params: ',req.params,';') ;
              res.redirect('/404?Url='+req.originalUrl) ;
            });
            //
            https.createServer({
                key: privateKey,
                cert: certificate
            }, app).listen(puerto,function(){
              console.log('....listen server on http://localhost:'+puerto) ;
            }) ;
            console.log('.....(E) HTTPSS: FINNNN') ;
            //
        } else {
          /*
          app.get('*',function(req, res, next) {
            console.log(' \n *** ERROR - 404 --> url: '+req.originalUrl+'; *** \n');
            let flagAceptaJspon = ( ( req.headers && req.headers.accept ) ? String(req.headers.accept).toUpperCase().indexOf('APPLICATION/JSON')!=-1 : false ) ;
            //
            if ( flagAceptaJspon ) {
                res.status(404);
                res.send( { error: 'url: '+req.originalUrl+' Not found' } );
                return;
            }
            res.redirect('/404?Url='+req.originalUrl) ;
          });
          */
          //
          app.get('*', function(req, res) {
            res.set('access-Control-Allow-Origin', '*');
            res.set('access-Control-Allow-Methods', '*');
            res.setHeader("Access-Control-Allow-Credentials", true);
            console.log('...(C) req.params: ',req.params,';') ;
            res.redirect('/404?Url='+req.originalUrl) ;
          });
          //
          app.listen(3000,function(){
            console.log('....listen server on http://localhost:3000') ;
          }) ;
        }
        //
      })
      .catch((finErr)=>{
        console.dir(finErr) ;
        console.log('....ERROR: Generando rutas de APP') ;
      })
    //
  } catch( errApplaunch ){
    console.dir(errApplaunch) ;
  }
//