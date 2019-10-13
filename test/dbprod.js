/*
*
*/
const path               = require('path')        ;
const dbClass            = require( path.join(__dirname,'../server/db/dbIndex') ).bases ;
const utiles             = require( path.join(__dirname,'../server/lib/utiles') ).Utilitarios() ;
const configuracionApp   = utiles.parseArchivoJson2Js( path.join(__dirname,'../server/config/general.json') ) ;
// const db                = dbClass( configuracionApp.database[process.env.AMBIENTE||'dev"] ) ;
const db                = dbClass( configuracionApp.database['produccion'] ) ;
//
let jsonStr  = [{ "tipo": "MFP", "modelo": "A402", "nombre": "A402 MONOCOLOR A4", "marca": "Sindoh", "descripcion": "Impresora monocolor A4", "conUSB": "true", "conWIFI": "true", "precio": 195.00, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "USD", "textoBusqueda": "MFP MULTIFUNCION D311 SINDOH A3 ALTA GAMA ", "imagenes": [{"secure_url":"",id:"1","url":"/img/banner/SINDOH A402.jpg"}] },{ "tipo": "MFP", "modelo": "A611DN", "nombre": "A611DN MONOCOLOR A4", "marca": "Sindoh", "descripcion": "Impresora blanco/negro A4", "conUSB": "true", "conWIFI": "true", "precio": 469.00, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "USD", "textoBusqueda": "MFP MULTIFUNCION D311 SINDOH A3 ALTA GAMA ", "imagenes": [{"secure_url":"",id:"1","url":"/img/banner/SINDOH A611dn.jpg"}] },{ "tipo": "MFP", "modelo": "D311", "nombre": "D311 COPIADORA - IMPRESORA - SCANNER A4 	MFP", "marca": "Sindoh", "descripcion": "M403 COPIADORA - IMPRESORA - SCANNER A4", "conUSB": "true", "conWIFI": "true", "precio": 250.00, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "USD", "textoBusqueda": "D311 COPIADORA - IMPRESORA - SCANNER A3 MFP COLOR ", "imagenes": [{"secure_url":"",id:"1","url":"/img/banner/SINDOH D311.jpg"}] },{ "tipo": "MFP", "modelo": "M403", "nombre": "M403  COPIADORA - IMPRESORA - SCANNER A3 MFP COLOR", "marca": "Sindoh", "descripcion": "D311 COPIADORA - IMPRESORA - SCANNER A3 MFP COLOR", "conUSB": "true", "conWIFI": "true", "precio": 3950.00, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "USD", "textoBusqueda": "D311 COPIADORA - IMPRESORA - SCANNER A4 	MFP ", "imagenes": [{"secure_url":"",id:"1","url":"/img/banner/SINDOH M403.jpg"}] },{ "tipo": "MFP", "modelo": "M611", "nombre": "M611  COPIADORA - IMPRESORA - SCANNER A3", "marca": "Sindoh", "descripcion": "M611 COPIADORA - IMPRESORA - SCANNER A3", "conUSB": "true", "conWIFI": "true", "precio": 4990.00, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "USD", "textoBusqueda": "M611  COPIADORA - IMPRESORA - SCANNER A3 ", "imagenes": [{"secure_url":"",id:"1","url":"/img/banner/SINDOH M611.jpg"}] },{ "tipo": "MFP", "modelo": "N410", "nombre": "N410 Series ", "marca": "Sindoh", "descripcion":"", "conUSB":"true", "conWIFI": true, "precio": 99, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "ARS", "textoBusqueda": "MFP MULTIFUNCION N410 SINDOH A3 ALTA GAMA ", "imagenes": [ {"id":"N410.FRENTE.jpg","url":"/img/productos/N410.FRENTE.jpg","secure_url":"/img/productos/N410.FRENTE.jpg"}, {"id":"N410.FRONTAL.jpg" ,"url":"/img/productos/N410.FRONTAL.jpg" ,"secure_url":"/img/productos/N410.FRONTAL.jpg"}, {"id":"N410.FRONTAL2.jpg"     ,"url":"/img/productos/N410.FRONTAL2.jpg","secure_url":"/img/productos/N410.FRONTAL2.jpg"} ] }, { "tipo": "MFP", "modelo": "N712", "nombre": "N712 A3", "marca": "Sindoh", "descripcion": "", "conUSB": "true", "conWIFI": "true", "precio": 99, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "ARS", "textoBusqueda": "MFP MULTIFUNCION N712 SINDOH A3 ALTA GAMA ", "imagenes": [ {"id":"N712.FRENTE.jpg","url":"/img/productos/N712.FRENTE.jpg","secure_url":"/img/productos/N712.FRENTE.jpg"}, {"id":"N712.top.jpg","url":"/img/productos/N712.top.jpg","secure_url":"/img/productos/N712.top.jpg"}, {"id":"N712.drawers.jpg","url":"/img/productos/N712.drawers.jpg","secure_url":"/img/productos/N712.drawers.jpg"} ]  }, { "tipo": "MFP", "modelo": "D311", "nombre": "D311 A3", "marca": "Sindoh", "descripcion": "", "conUSB": "true", "conWIFI": "true", "precio": 99.00, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion ", "categoriaSuperior": "MFP", "moneda": "ARS", "textoBusqueda": "MFP MULTIFUNCION D311 SINDOH A3 ALTA GAMA ", "imagenes": [] }, { "tipo": "MFP", "modelo": "D203", "nombre": "D202 A3 Color", "marca": "Sindoh", "descripcion": "", "conUSB": "true", "conWIFI": "true", "precio": 99, "stock": 5, "categoriaPrimaria": "MFP ", "categoriaSegunTitulo": "Multifuncion  Color", "categoriaSuperior": "MFP", "moneda": "ARS", "textoBusqueda": "MFP MULTIFUNCION D202 SINDOH A3 COLOR", "imagenes": [ {"id":"D202.lado.jpg","url":"/img/productos/D202.lado.jpg","secure_url":"/img/productos/D202.lado.jpg"}, {"id":"D201.USB.jpg" ,"url":"/img/productos/D201.USB.jpg" ,"secure_url":"/img/productos/D201.USB.jpg"}, {"id":"D202.frente.jpg","url":"/img/productos/D202.frente.jpg","secure_url":"/img/productos/D202.frente.jpg"} ]} ] ;
let tempProd = jsonStr ; //JSON.parse( jsonStr ) ;
console.dir(tempProd) ;
console.log('...ll: '+tempProd.length+';') ;
//
db.productos.add( tempProd )
    .then(respSincro=>{
        console.log('....termin categorias') ;
        console.dir(respSincro) ;
    })
    .catch(respErr=>{
        console.log('.....error: ')
        console.dir(respErr) ;
    }) ;
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