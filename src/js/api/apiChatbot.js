/*
*
*/
import moment                                           from 'moment-timezone'  ;
import {PARAMETROS,opcionesPOST,obj2qryString}          from '../utils/parametros'  ;
//
const qryChatbots = (argQry) => {
    return new Promise(function(respOk,respRech){
        try {
                let opcionesFetch = {...opcionesPOST} ;
                opcionesFetch.method = 'GET' ;
                let tempUrl = '/api/chatbot' + obj2qryString(argQry) ;
                console.log('....tempUrl: '+tempUrl) ;
                //
                fetch(tempUrl ,opcionesFetch )
                    .then((respFetch)=>{
                        if ( respFetch.status>=200 && respFetch.status<=401 ){
                            if ( respFetch.status==401 ){
                                return false ;
                            } else {
                                return respFetch.json() ;
                            }
                        } else {
                            return respFetch.text().then((respErrHttp)=>{
                                respRech(respErrHttp);
                                throw new Error(respErrHttp) ;
                            }) ;
                            //return false ;
                        }
                    })
                    .then((respDatos)=>{
                        respOk(respDatos) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        respRech(respErr) ;
                    }) ;
                    //
        } catch(errLC){
            console.dir(errLC) ;
            respRech(errLC) ;
        }
    }) ;
}
//
export const chatbot = {
    qry: qryChatbots
} ;
//