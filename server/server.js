/*
*
*/
const express          = require('express');
const app              = express();
const bodyParser       = require('body-parser') ;
const cookieParser     = require('cookie-parser')   ;
const session          = require('express-session') ;
const MemoryStore      = require('session-memory-store')(session);
const utiles           = require('./lib/utiles').Utilitarios() ;
const mustacheExpress  = require('mustache-express') ;
//
const https            = require('https') ;
const path             = require('path')  ;
const fs               = require('fs')    ;
//
import { bases as dbClass }    from 'echatbot-mongodb' ;
import { routesApp }           from './routes/routerServer' ;
import configuracionApp        from './config/general.json'  ;
//
if ( process.env.GLOBAL_GOOGLE_ANALYTICS ){
  configuracionApp.metaTags.default.GLOBAL_GOOGLE_ANALYTICS = process.env.GLOBAL_GOOGLE_ANALYTICS ;
}
//
if ( !process.env.AMBIENTE ){ process.env.AMBIENTE='dev'; }
process.env.AMBIENTE = String(process.env.AMBIENTE).trim() ;
console.log('\n *** AMBIENTE: "'+process.env.AMBIENTE+'" \n') ;
//
let configDb = configuracionApp.database[process.env.AMBIENTE ||'dev'] ;
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ name:'mlsess',secret: 'wsx22wsx',cookie: {path: '/',httpOnly: true,maxAge: 6000000 },proxy: true, resave: true,saveUninitialized: true, store: new MemoryStore() }));
//
const passportConfigured = configPassport(  configuracionApp.passport[process.env.AMBIENTE||'dev'] , app, db )  ;
//
app.disable('x-powered-by');
app.disable('etag');
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
// app.enable('trust proxy');
//
if ( process.env.AMBIENTE=='produccion' ){
  app.use(
        require('express-naked-redirect')({
          subDomain: 'www',
          protocol: 'https'
        })
  ) ;
}
/*
*   Rutas
*/
try {
    //
    app.all('*', function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header("Access-Control-Allow-Credentials", true);
      res.header("credentials","same-origin") ;
      next() ;
    }) ;
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
        if ( process.env.AMBIENTE=='produccion' ){
            console.log('.....(A) create server http') ;
            var httpPort = 80 ;
            const http   = express() ;
            console.log('.....(B) HTTP: define *') ;
            http.get('*', function(req, res) {
                var hhost = (req.headers.host && String(req.headers.host).indexOf(':')!=-1) ? req.headers.host.split(":")[0] : req.headers.host ;
                console.log('....voy a redirect --> '+ hhost + req.url+';') ;
                res.redirect('https://' + hhost + req.url ) ;
            }) ;
            console.log('.....(C) HTTP: listen') ;
            http.listen( httpPort , function(){
              console.log('....http server listening in port '+httpPort+'.') ;
            });
            //
            var puerto      = process.env.PORT || 443  ;
            var privateKey  = fs.readFileSync( path.join(__dirname,'./cert/waiboc.com.privkey.pem') );
            var certificate = fs.readFileSync( path.join(__dirname,'./cert/waiboc.com.cert.pem') );
            //
            console.log('.....(D) HTTPSS: listen') ;
            https.createServer({
                key: privateKey,
                cert: certificate
            }, app).listen(puerto,function(){
              console.log('....listen server on http://localhost:'+puerto) ;
            }) ;
            console.log('.....(E) HTTPSS: FINNNN') ;
            //
        } else {
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