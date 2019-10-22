/*
*
*/
import moment                             from 'moment-timezone'  ;
import ls                                 from 'local-storage'    ;
import {PARAMETROS,opcionesPOST}          from '../utils/parametros'  ;
//
const updateAccount = (argProducto) => {
    return new Promise(function(respOk,respRech){
        try {
            let tempTs = moment( new Date().toISOString() ) ;
            let tempCarrito = ls( PARAMETROS.SESSION.CARRITO ) || {_id:'',estadoOrden: PARAMETROS.SESSION.CARRITO_ESTADO_INICIAL ,productos:{},email:'',direccion:'',numero:'',piso:'',puerta:'',ciudad:'',pais:'',codigoPostal:'',celular:'',telefonoFijo:'',telefonoTrabajo:'',comentario:'',ts_creacion:tempTs,ts_sincronizacion:null,} ;
            //
            if ( !tempCarrito.productos[argProducto._id] ){ tempCarrito.productos[argProducto._id] = {...argProducto,ts_carrito_iniciado:tempTs, cantidad:0}; }
            tempCarrito.productos[argProducto._id].cantidad++ ;
            tempCarrito.productos[argProducto._id].ts_carrito_ultima_modificacion = tempTs ;
            tempCarrito.productos[argProducto._id].estadoSincronizacion = PARAMETROS.SESSION.CARRITO_PENDIENTE_SINCRONIZACION ;
            ls( PARAMETROS.SESSION.CARRITO, tempCarrito ) ;
            //
            respOk( tempCarrito ) ;
            //
            sincronizarOrdenes()
                .then((respSincrOrd)=>{
                    console.log('....termine de sincronizar orden/carrito ') ;
                    console.dir(respSincrOrd) ;
                    let tempCarritoASincronizar = ls( PARAMETROS.SESSION.CARRITO ) ;
                    tempCarritoASincronizar._id = respSincrOrd._id ;
                    //tempCarritoASincronizar.estadoOrden = respSincrOrd.estadoOrden ;
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
            let opcionesFetch = {...opcionesPOST} ;
            opcionesFetch.method = 'GET' ;
            //
            fetch('/api/user',opcionesFetch)
                .then((respFetch)=>{
                    if ( respFetch.status>=200 && respFetch<=400 ){
                        return respFetch.json() ;
                    } else {
                        respFetch.text().then((respErrHttp)=>{
                            respRech(respErrHttp);
                        }) ;
                        return false ;
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