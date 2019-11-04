/*
*
*/
//
const dbConnClass    = require('./db').classDb ;
const dbEstadisticas = require('./dbEstadisticas').classDb ;
const dbUsuarios     = require('./dbUsuarios').classDb ;
const dbChatbots     = require('./dbChatbots').classDb ;
const dbConsultas    = require('./dbConsultas').classDb ;
//
module.exports.bases = (argConfig) => {
    //
    const dbConn         = new dbConnClass( argConfig ) ;
    return {
        estadisticas: new dbEstadisticas(dbConn),
        usuarios: new dbUsuarios(dbConn),
        chatbot: new dbChatbots(dbConn) ,
        consultas: new dbConsultas(dbConn)
    }
} ;
//
