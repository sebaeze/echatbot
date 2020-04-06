/*
*
*/
module.exports.autenticado = (argDb) => {
    return ( (req,res,next) => {
        if ( req.user ){
            // console.log('...email: '+req.user.email+' baseUrl: '+String(req.baseUrl).toUpperCase()) ;
            if ( String(req.baseUrl).toUpperCase().indexOf("/ADMIN")!=-1  ){
                argDb.usuarios.get( {email:req.user.email} )
                     .then(function(respUsr){
                        console.dir(respUsr) ;
                        let objUsuario = {seguridad:{administrador:false}}
                        if ( respUsr.length>0 && respUsr[0].seguridad ){ objUsuario.seguridad = respUsr[0].seguridad ; }
                        console.dir(objUsuario.seguridad) ;
                        if ( objUsuario.seguridad.administrador==true ){
                            next() ;
                        } else {
                            res.redirect('/error?error=usuario '+req.user.email+' no posee accesos adm');
                        }
                     }.bind(this))
                     .catch((errResp)=>{
                         console.dir(respUsr) ;
                         res.redirect('/error?error='+JSON.stringify(respUsr));
                     }) ;
            } else {
                next() ;
            }
        } else {
            let reqContenttype = req.headers['accept'] || req.headers['content-type'] || 'html' ;
            // console.log(new Date().toISOString()+'......reqContenttype: '+reqContenttype+' originalUrl: '+req.originalUrl+' req.url: '+req.url+' usuario not-logged') ;
            //
            /*
            var hhost = (req.headers.host && String(req.headers.host).indexOf(':')!=-1) ? req.headers.host.split(":")[0] : req.headers.host ;
            if ( process.env.AMBIENTE=='produccion' && String(hhost).toUpperCase().indexOf('WAIBOC.COM')==-1 ){
                console.log('\n\n ***************** \n *** (B) ALGUN LOGI HIZO REDIRECT \n hhost: '+hhost+' \n****************** ');
                res.redirect('https://www.google.com/' ) ;
                console.log('...ya deberia haber echo redirect aca....  ') ;
            } else {
                if ( String(reqContenttype).indexOf("json")!=-1 ){
                    res.status(401) ;
                    res.json( {error:"no-logoneado",mensaje:"debe autenticarse a traves de la url /auth"} ) ;
                } else {
                    req.session['urlRedirect'] = req.originalUrl ;
                    res.redirect('/login?urlRedirect='+req.originalUrl);
                }
            }
            */
            //
            if ( String(reqContenttype).indexOf("json")!=-1 ){
                res.status(401) ;
                res.json( {error:"no-logoneado",mensaje:"debe autenticarse a traves de la url /auth"} ) ;
            } else {
                req.session['urlRedirect'] = req.originalUrl ;
                res.redirect('/login?urlRedirect='+req.originalUrl);
            }
            //
        }
    } );
}
//
export const autenticadoFn = module.exports.autenticado ;
//