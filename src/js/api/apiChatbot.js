/*
*
*/
import moment                                           from 'moment-timezone'  ;
import {PARAMETROS,opcionesPOST,obj2qryString}          from '../utils/parametros'  ;
//
const addNewChatbot = (argNewBot) => {
    return new Promise(function(respOk,respRech){
        try {
            let opcionesAdd = {...opcionesPOST} ;
            opcionesAdd.method = 'POST' ;
            opcionesAdd.body    = JSON.stringify(argNewBot) ;
            //
            fetch( '/api/chatbot'  , opcionesAdd )
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
        } catch(errANC){
            respRech(errANC) ;
        }
    }) ;
}
//
const trainChatbot  = (argTrainChatbot,flagDeleteIntent=false) => {
    return new Promise(function(respOk,respRech){
        try {
            let opcionesAdd = {...opcionesPOST} ;
            opcionesAdd.method = flagDeleteIntent==true ? 'DELETE' : 'POST' ;
            opcionesAdd.body    = JSON.stringify(argTrainChatbot) ;
            //
            fetch( '/api/train'  , opcionesAdd )
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
        } catch(errANC){
            respRech(errANC) ;
        }
    }) ;
}
//
const deleteChatbot = (argBot) => {
    return new Promise(function(respOk,respRech){
        try {
            let opcionesAdd = {...opcionesPOST} ;
            opcionesAdd.method = 'DELETE' ;
            opcionesAdd.body    = JSON.stringify(argBot) ;
            //
            fetch( '/api/chatbot'  , opcionesAdd )
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
        } catch(errANC){
            respRech(errANC) ;
        }
    }) ;
}
//
const qryChatbots = (argQry) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            if ( !argQry.status ){ argQry.status='ACTIVE'; }
            let opcionesFetch = {...opcionesPOST} ;
            delete opcionesFetch.body ;
            opcionesFetch.method = 'GET' ;
            let tempUrl = '/api/chatbot' + obj2qryString(argQry) ;
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
    add: addNewChatbot,
    delete: deleteChatbot,
    qry: qryChatbots,
    train: trainChatbot
} ;
//