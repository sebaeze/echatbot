/*
*
*/
import moment                             from 'moment-timezone'  ;
import ls                                 from 'local-storage'    ;
import {PARAMETROS,opcionesPOST}          from '../utils/parametros'  ;
//
const updateAccount = (argAccount) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            ls( PARAMETROS.SESSION.USUARIO, argAccount ) ;
            //
            let tempOptPost = opcionesPOST ;
            tempOptPost.body = JSON.stringify(argAccount)  ;
            //
            fetch('/api/user',tempOptPost)
                    .then((respFetch)=>{
                        if ( respFetch.status>=200 && respFetch.status<=400 ){
                            return respFetch.json() ;
                        } else {
                            respFetch.text().then((respErrHttp)=>{
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
        } catch(errAdd){ console.dir(errAdd); respRech(errAdd); }
    }.bind(this)) ;
} ;
//
const getAccount = () => {
    return new Promise(function(respOk,respRech){
        try {
            respOk({}) ;
        } catch(errGACC){
            respRech(errGACC) ;
        }
    }) ;
} ;
//
const getUserInfo = () => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let outUserSession = ls( PARAMETROS.SESSION.USUARIO ) || false ;
            if ( outUserSession==false ){
                let opcionesFetch = {...opcionesPOST} ;
                opcionesFetch.method = 'GET' ;
                fetch('/api/user',opcionesFetch)
                    .then((respFetch)=>{
                        if ( respFetch.status>=200 && respFetch.status<=400 ){
                            return respFetch.json() ;
                        } else {
                            respFetch.text().then((respErrHttp)=>{
                                respRech(respErrHttp);
                                throw new Error(respErrHttp) ;
                            }) ;
                            //return false ;
                        }
                    })
                    .then((respDatos)=>{
                        ls( PARAMETROS.SESSION.USUARIO, respDatos ) ;
                        respOk(respDatos) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        respRech(respErr) ;
                    }) ;
            } else {
                respOk( outUserSession) ;
            }
            //
        } catch(errGACC){
            respRech(errGACC) ;
        }
    }) ;
} ;
//
export const account = {
    update: updateAccount,
    getAccount: getAccount,
    getUserInfo: getUserInfo
} ;
//