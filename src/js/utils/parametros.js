/*
*
*/
export const PARAMETROS = {
    SESSION:{
        USUARIO:'USER_SESSION',
        CATEGORIAS_MARCAS: 'categoriasMarcas',
        TIEMPO_SINCRONIZACION_MINUTOS: 30,
        CARRITO: 'carrito',
        CARRITO_ESTADO_INICIAL: 'INICIAL',
        CARRITO_PENDIENTE_SINCRONIZACION: 'carritoPendiente',
        CARRITO_SINCRONIZADO: 'carritoSincronizado'
    },
    BACKEND:{
        API_ORDENES: '/api/ordenes',
        API_CONSULTAS: '/api/consultas',
        API_SUSCRIPCION: '/api/suscripcion',
        API_DISTRIBUIDORES: '/api/distribuidores'
    },
    FORM:{
        USER_INFO: 'USER_INFO',
        CHATBOTS: 'CHATBOTS'
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
            if ( isNaN(datoKey) ){
                if ( datoKey.length>0 ){
                    arrayQry.push( keyObj+'='+datoKey ) ;
                }
            } else {
                arrayQry.push( keyObj+'='+datoKey ) ;
            }
		}
	}
	if ( arrayQry.length>0 ){
		outQueryString = '?' +  ( Array.isArray(argJsObject) ? arrayQry.join(',') : arrayQry.join('&') ) ;
	}
	return outQueryString ;
};
//
