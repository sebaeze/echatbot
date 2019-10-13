/*
*
*/
//
const dbConnClass    = require('./db').classDb ;
const dbEstadisticas = require('./dbEstadisticas').classDb ;
const dbProductos    = require('./dbProductos').classDb ;
const dbUsuarios     = require('./dbUsuarios').classDb ;
const dbConsultas    = require('./dbConsultas').classDb ;
const dbOrdenes         = require('./dbOrdenes').classDb ;
const dbDistribuidores  = require('./dbDistribuidores').classDb ;
//
module.exports.bases = (argConfig) => {
    //
    const dbConn         = new dbConnClass( argConfig ) ;
    return {
        productos: new dbProductos(dbConn),
        estadisticas: new dbEstadisticas(dbConn),
        usuarios: new dbUsuarios(dbConn),
        consultas: new dbConsultas(dbConn),
        ordenes: new dbOrdenes(dbConn),
        distribuidores: new dbDistribuidores(dbConn)
    }
} ;
//
