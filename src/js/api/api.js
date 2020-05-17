/*
*
*/
import { PARAMETROS, opcionesPOST }     from '../utils/parametros' ;
import { account }                      from './apiAccount'        ;
import { chatbot   }                    from './apiChatbot'        ;
import { distribuidores }               from './apiDistribuidores' ;
//
export const enviarSuscripcion = (argForm) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let strForm = JSON.stringify({...argForm}) ;
            let postOpt = {...opcionesPOST} ;
            postOpt.body = strForm ;
            //
            fetch( PARAMETROS.BACKEND.API_SUSCRIPCION ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: ADD Suscripcio. Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errEnvCon){
            respRech(errEnvCon) ;
        }
    }) ;
} ;
//
export const enviarConsulta = (argForm) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let strForm = JSON.stringify({...argForm}) ;
            let postOpt = {...opcionesPOST} ;
            postOpt.body = strForm ;
            //
            fetch( PARAMETROS.BACKEND.API_CONSULTAS ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: ADD Consulta. Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errEnvCon){
            respRech(errEnvCon) ;
        }
    }) ;
} ;
//
export const sendError2Backend = (argError) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let strForm = JSON.stringify({...argForm}) ;
            let postOpt = {...opcionesPOST} ;
            postOpt.body = argError ;
            //
            fetch( PARAMETROS.BACKEND.API_ERROR ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: sendError2Backend. Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errEnvCon){
            respRech(errEnvCon) ;
        }
    }) ;
} ;
//
export const api = {
    account: account,
    chatbot: chatbot
}
//