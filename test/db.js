/*
*
*/
const path               = require('path')        ;
const dbClass            = require( path.join(__dirname,'../server/db/dbIndex') ).bases ;
const utiles        = require( path.join(__dirname,'../server/lib/utiles') ).Utilitarios() ;
const configuracionApp   = utiles.parseArchivoJson2Js( path.join(__dirname,'../server/config/general.json') ) ;
//
const db                = dbClass( configuracionApp.database[process.env.AMBIENTE||'dev'] ) ;
// const db                = dbClass( configuracionApp.database['produccion'] ) ;
//
//db.productos.add( {_id:'test',nombre:'nombreTest',marca:'marcaFruta',tipo:'tipoTest',modelo:'modeloTest',precio: 100.00 } )
//db.usuarios.add( {_id:'sebaaa@gmail.com',email:'sebaaa@gmail.com'} )
//
let tempDistr = [
{url:"https://www.jymallgraphics.com.ar",telefono:"+5411-4923-3717",whatsapp:"+5411-65562347","nombre":"JYM ALL GRAPHICS","razonSocial":"JYM ALL GRAPHICS","email":"jym.allgraphics@gmail.com","marca":"JYM ALL GRAPHICS","descripcion":"venta de equipos","direccion":"Av. José María Moreno 1767",ciudad:"Capital Federal",provincia:"Buenos Aires","pais":"Argentina","coordenadas":{ "lat": "-34.638900", "lng": "-58.431651"} },
{url:"https://genesiscopiers.com.ar/",telefono:"+54 11 15-5724-0938",whatsapp:"+54 11 15-5724-0938","nombre":"Genesis Copiers","razonSocial":"Genesis Copiers","email":"info@genesiscopiers.com","marca":"Genesis Copiers","descripcion":"venta de equipos","direccion":"Av Directorio 7289",ciudad:"Capital Federal",provincia:"Buenos Aires","pais":"Argentina","coordenadas":{ "lat": "-34.664896", "lng": "-58.509475"} }    
//{url:"N/A","nombre":"SEBAAAA","razonSocial":"sebaaaa","email":"jymallgraphics.servicios@gmail.com","marca":"","descripcion":"venta de equipos","direccion":"Av. Mariano moreno","pais":"Argentina","coordenadas":{ "lat": "-34.644406", "lng": "-58.489822"} },
//{url:"https://www.fruta.com","nombre":"AAAAA","razonSocial":"AAAAA","email":"jymallgraphics.servicios@gmail.com","marca":"","descripcion":"venta de equipos","direccion":"Av. Mariano moreno","pais":"Argentina","coordenadas":{ "lat": "-38.638900", "lng": "-56.431651"} }
] ;
//
db.distribuidores.add( tempDistr )
        .then(respSincro=>{
            console.log('....termin') ;
            console.dir(respSincro) ;
        })
        .catch(respErr=>{
            console.log('.....error: ')
            console.dir(respErr) ;
        }) ;
        console.log('...fin') ;
//
/*
db.productos.getCategoriasCantidad()
        .then(respSincro=>{
            console.dir(respSincro) ;
        })
        .catch(respErr=>{
            console.dir(respErr) ;
        }) ;
        */