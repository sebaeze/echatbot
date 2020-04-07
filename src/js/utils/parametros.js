/*
*
*/
import { APP_ID }      from '../../../build_config/config' ;
//
export const PARAMETROS = {
    APP_ID: { ...APP_ID },
    SESSION:{
        USUARIO:'USER_SESSION',
        TIEMPO_SINCRONIZACION_MINUTOS: 30,
        CARRITO: 'carrito',
        CARRITO_ESTADO_INICIAL: 'INICIAL',
        CARRITO_PENDIENTE_SINCRONIZACION: 'carritoPendiente',
        CARRITO_SINCRONIZADO: 'carritoSincronizado'
    },
    BACKEND:{
        API_CONSULTAS: '/api/consultas',
        API_SUSCRIPCION: '/api/suscripcion',
        API_CHATBOT_UPDATE: '/api/chatbot',
        API_CHATBOT_TRAIN: '/api/train'

    },
    FORM:{
        USER_INFO: 'profile',
        CHATBOTS: 'chatbots'
    }
} ;
//
export const opcionesPOST = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'accept':'application/json'
    },
    credentials: "same-origin",
    json: true,
    body: null
};
//
export const obj2qryString = (argJsObject) =>{
	let outQueryString = '' ;
	let arrayQry       = [] ;

	for ( let keyObj in argJsObject ){
		let datoKey  = argJsObject[keyObj] ;
		if ( typeof datoKey=="object" ){
			if ( Array.isArray(datoKey)){
				arrayQry.push( keyObj+'='+datoKey.join(',')   ) ;
			} else {
				let tempArrayObjUrl = [] ;
				for ( let keyObjDat in datoKey ){
					tempArrayObjUrl.push( keyObjDat+'='+datoKey[keyObjDat]  ) ;
				}
				arrayQry.push(  tempArrayObjUrl.join('&') ) ;
			}
		} else {
            if ( datoKey ){
                if ( isNaN(datoKey) ){
                    if ( datoKey.length>0 ){
                        arrayQry.push( keyObj+'='+datoKey ) ;
                    }
                } else {
                    arrayQry.push( keyObj+'='+datoKey ) ;
                }
            }/* else {
                console.log('.....se pierde la key ?? ') ;
                console.dir(argJsObject) ;
            } */
		}
	}
	if ( arrayQry.length>0 ){
		outQueryString = '?' +  ( Array.isArray(argJsObject) ? arrayQry.join(',') : arrayQry.join('&') ) ;
	}
	return outQueryString ;
};
//
