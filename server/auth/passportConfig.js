/*
*    Passport configuration for our app
*/
const passport            = require('passport') ;
const router              = require('express').Router()   ;
const path                = require('path')     ;
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