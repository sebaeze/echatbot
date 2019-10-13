/*
*
*/
import moment                  from 'moment-timezone'  ;
import ls                      from 'local-storage'    ;
import {PARAMETROS}            from '../utils/parametros'       ;
import {opcionesPOST}          from '../utils/parametros'       ;
//
const add = (argProducto) => {
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
const sincronizarOrdenes = () => {
    return new Promise(function(respOk,respRech){
        //
        let tempCarrito = ls( PARAMETROS.SESSION.CARRITO ) || false ;
        if ( tempCarrito ){
            if ( typeof tempCarrito!=="string" ){ tempCarrito=JSON.stringify(tempCarrito); }
            let postOpt = {...opcionesPOST} ;
            //
            if ( tempCarrito.estadoOrden==PARAMETROS.SESSION.CARRITO_ESTADO_INICIAL ){
                postOpt.body = {productos: tempCarrito.productos} ;
            } else {
                postOpt.body = tempCarrito ;
            }
            //
            fetch( PARAMETROS.BACKEND.API_ORDENES ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: ADD Productos nuevos. Http Status: "+response.status+'.') ;
                }
            })
            .then((argJson     ) => { respOk(argJson) ; })
            .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
        } else {
            respRech( {error:"no hay carrito en session"} ) ;
        }
        //
    }.bind(this)) ;
} ;
//
export const apiCarrito = {
        add: add,
        sincronizar: sincronizarOrdenes
} ;