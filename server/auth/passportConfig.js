/*
*    Passport configuration for our app
*/
const passport            = require('passport') ;
const router              = require('express').Router()   ;
const LocalStrategy       = require('passport-local').Strategy  ;
//
import { APP_GLOBALES }                         from '../config/variablesGlobales' ;
//
const configPassportApp = (argConfigPassport,argApp, argDb) => {
  //
  const strategies        = require('./passportStrategy').strategies( argConfigPassport ) ;
  //
  for ( let keyStrategy in strategies ){
    let objStrategy = strategies[keyStrategy] ;
    let objRedirects = { successRedirect: '/',
                          failureRedirect: '/login',
                          failureFlash: false
                        } ;
    //
    if ( argConfigPassport[keyStrategy].scope ){ objRedirects['scope']=argConfigPassport[keyStrategy].scope; }
    if ( argConfigPassport[keyStrategy].urlLogin ){
      router.all( argConfigPassport[keyStrategy].urlLogin ,
          function(req,res,next){
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header("Access-Control-Allow-Credentials", true);
            res.header("credentials","same-origin") ;
            next() ;
          },
          passport.authenticate(keyStrategy,objRedirects)
        ) ;
    }
    if ( argConfigPassport[keyStrategy].pathUrlCallback ){
      router.get(argConfigPassport[keyStrategy].pathUrlCallback, function(req, res, next) {
        let urlRedirect = req.session['urlRedirect'] || "/" ;
        console.log('....urlRedirect: '+urlRedirect+' sess: '+req.session['urlRedirect']+' path: '+req.originalUrl )
        passport.authenticate(keyStrategy,function(err, user, info) {
          if (err) {
            console.log('err: '+err+';') ;
          } else {
            /*
            console.log('user: ') ;
            console.dir(user) ;
            */
          }
          //
          if (!user) { console.log('....(A) voy a hcer redirect antesssssss ') ;return res.redirect( urlRedirect ); }
          /*  */
          argDb.usuarios.mergeLoginUser(user)
                .then((respMerge)=>{
                  respMerge = Array.isArray(respMerge) ? respMerge[0] : respMerge ;
                  delete respMerge.provider ;
                  delete respMerge._v ;
                  req.logIn(respMerge, function(err) {
                    if (err) { return next(err); }
                    req.session.user = respMerge ;
                    return res.redirect( urlRedirect );
                  });
                })
                .catch((respErrMerge)=>{
                  console.log('..(3) db__merge:: catch') ;
                  throw respErrMerge ;
                }) ;
          //
        }.bind(argDb))(req, res, next);
      }.bind(argDb));
    }
    //
    passport.use( objStrategy.strategy ) ;
      //
    passport.serializeUser(function(user, done) { done(null, user)   ; });
    passport.deserializeUser(function(user, done) { done(null, user) ; });
    //
  }
  // Local Strategy -> '/auth/local/login'
  //
  try {
    passport.use(
    new LocalStrategy( { usernameField: 'email', passwordField: 'password',passReqToCallback: true },
      function(req, username, argPassword, done) {
        let newRegExt = new RegExp( username, "i" ) ;
        argDb.usuarios.get({ email: newRegExt })
          .then((userInfo)=>{
          if ( userInfo.length==0 ){
            req.authError = {
              resultCode: APP_GLOBALES.RESULT_CODES.USER_EMAIL_DO_NOT_EXIST,
              result: "Email existe pero password es invalida"
            } ;
            return done(null, false );
          } else {
            userInfo = userInfo[0] ;
            if ( userInfo.password==argPassword ){
              return done(null, userInfo );
            } else {
              req.authError = {
                resultCode: APP_GLOBALES.RESULT_CODES.USER_PASSWORD_INVALID,
                result: "Password es invalida"
              } ;
              try {
                return done(null, false );
              } catch(errDone){
                console.log('....error done: ',errDone) ;
              }
            }
          }
        })
        .catch((resuErr)=>{
          console.log('....ERROR find user: ',resuErr) ;
          return done(null, false ) ;
        })
        //
      }
  ));
  //
  passport.serializeUser(function(user, done) {
    done(null, user)   ;
  });
  passport.deserializeUser(function(user, done) {
    done(null, user) ;
  });
  //
  // router.post( '/local/login' , passport.authenticate('local', { successRedirect: '/api/account/user', failureRedirect: '/auth/local/failure', failureFlash: true} ) ) ;
  router.post( '/local/login' ,
      function(req,res,next){
        //
        // console.log('..../local/login: body: ',req.body) ;
        //
        if ( req.body.flagNewUser==true ){
          let tempNewUSer = {
            _id: req.body.email,
            ...req.body
          }
          argDb.usuarios.add( tempNewUSer )
            .then((respNewUser)=>{
              next() ;
            })
            .catch((errNU)=>{
              console.log('...errNU: ',errNU) ;
              next() ;
            })
        } else {
          next();
        }
      },
      passport.authenticate('local',{ failWithError: true }),
      function(req,res,next){
        if(req.autherror) {
          res.json({...req.authError}) ;
      } else {
          res.redirect('/api/account/user') ;
      }
    },
    function(err, req, res, next) {
      // Handle error
      // console.log('....(E) local:: req.autherror: ',req.authError,' err: ',err) ;
      //res.status(401).send({ success: false, message: err, desc: req.authError })
      res.status(200) ;
      res.json({...req.authError}) ;
      //
    }
  ) ;
  //
  router.get('/local/failure',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("credentials","same-origin") ;
    //
    console.log('...req.authError: ',req.authError) ;
    res.json({...req.authError}) ;
    //
  }) ;
  //
} catch(errNN){
  console.log('...errNN: ',errNN) ;
}
  //
  argApp.use( passport.initialize() ) ;
  argApp.use( passport.session()    ) ;
  //
  return {
    passport: passport,
    routes: router
  } ;
  //
} ;
//
module.exports.passportConfig = configPassportApp ;
//