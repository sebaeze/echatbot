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
const getUserInfo = ( flagForzar=false ) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let tempTs = moment().format() ;
            let outUserSession = ls( PARAMETROS.SESSION.USUARIO ) || false ;
            if ( flagForzar==true ){ outUserSession=false; }
            //
            if ( outUserSession==false ){
                let opcionesFetch = {...opcionesPOST} ;
                opcionesFetch.method = 'GET' ;
                fetch('/api/user',opcionesFetch)
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
                        if ( respDatos ){
                            ls( PARAMETROS.SESSION.USUARIO , { ...respDatos, timestamp_session: tempTs } ) ;
                        }
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
const loginUser = ( argUserInfo ) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let postOpt = {...opcionesPOST} ;
            postOpt.method = 'POST' ;
            postOpt.body   = JSON.stringify(argUserInfo) ;
            //
            fetch( PARAMETROS.BACKEND.API_ACCOUNT_LOGIN ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: loginUser:: Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errGAU){
            respRech(errGAU) ;
        }
    }) ;
} ;
//
const logoutAccount = () => {
        try {
            //
            if ( ls( PARAMETROS.SESSION.USUARIO ) ){
                ls.remove( PARAMETROS.SESSION.USUARIO ) ;
            }
            //
        } catch(errGACC){
            console.dir(errGACC) ;
        }
} ;
//
const passwordReset = ( argUserInfo ) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let postOpt = {...opcionesPOST} ;
            postOpt.method = 'POST' ;
            postOpt.body   = JSON.stringify(argUserInfo) ;
            //
            fetch( PARAMETROS.BACKEND.API_ACCOUNT_FORGOT_PASSWORD ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: forgotPassword:: Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errGAU){
            respRech(errGAU) ;
        }
    }) ;
} ;
//
const passwordChange = ( argUserInfo ) => {
    return new Promise(function(respOk,respRech){
        try {
            //
            let postOpt = {...opcionesPOST} ;
            postOpt.method = 'POST' ;
            postOpt.body   = JSON.stringify(argUserInfo) ;
            //
            fetch( PARAMETROS.BACKEND.API_ACCOUNT_UPDATE_PASSWORD ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: forgotPassword:: Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
            //
        } catch(errGAU){
            respRech(errGAU) ;
        }
    }) ;
} ;
//
export const account = {
    update: updateAccount,
    getAccount: getAccount,
    getUserInfo: getUserInfo,
    loginUser: loginUser ,
    logout: logoutAccount ,
    passwordReset: passwordReset,
    passwordChange: passwordChange
} ;
//