/*
*
*/
const path                   = require('path') ;
const MercadolibreProductos  = require( path.join(__dirname,'./mercadolibreProductos') ).class ;
const MercadolibreUsuarios   = require( path.join(__dirname,'./mercadolibreUsuarios') ).class ;
//
module.exports.mercadolibre = (argConfig) => {
    return {
        products: new MercadolibreProductos(argConfig),
        users: new MercadolibreUsuarios(argConfig)
    } ;
}
//