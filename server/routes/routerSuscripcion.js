/*
*
*/
const router          = require('express').Router()   ;
//
module.exports.suscripcion = (argDb) => {
    //
    router.all('/', function(req, res) {
        //
        console.log('.....estoy en suscricion') ;
        console.dir(req.body) ;
        //
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        res.set("Access-Control-Allow-Credentials", true);
        //
        try{
          //
            argDb.usuarios.add( req.body )
                .then(function(respReq){
                    res.json( respReq );
                }.bind(this))
                .catch(function(respRej){
                    console.dir(respRej) ;
                    res.status(500) ;
                    res.json(respRej) ;
                }.bind(this)) ;
          //
        } catch(errRe){
          res.status(500) ;
          res.json(errRe) ;
        }
        //
      });
    //
    return router ;
} ;
//