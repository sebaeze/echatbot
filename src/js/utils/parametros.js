/*
*
*/
import { APP_ID }      from '../../../build_config/config' ;
//
export const PARAMETROS = {
    APP_ID: { ...APP_ID },
    SESSION:{
        USUARIO:'WAIBOC_USER_SESSION',
        TIEMPO_SINCRONIZACION_MINUTOS: 30,
        CARRITO: 'WAIBOC_CART',
        CARRITO_ESTADO_INICIAL: 'INICIAL',
        CARRITO_PENDIENTE_SINCRONIZACION: 'carritoPendiente',
        CARRITO_SINCRONIZADO: 'carritoSincronizado'
    },
    FRONTEND: {
        URL_TRAIN_CHATBOT: '/train/'
    },
    BACKEND:{
        API_CONSULTAS: '/api/consultas',
        API_ERROR: '/api/error/console',
        API_SUSCRIPCION: '/api/suscripcion',
        API_CHATBOT_UPDATE: '/api/chatbot',
        API_CHATBOT_TRAIN: '/api/train',
        API_CHATBOT_QUERY_SLOT:  '/api/slot/query',
        API_CHATBOT_UPDATE_SLOT: '/api/slot/update',
        API_ACCOUNT_INFO: '/api/account/user',
        API_ACCOUNT_LOGIN: '/auth/local/login',
        API_ACCOUNT_LOGOUT: '/auth/logout',
        API_ACCOUNT_FORGOT_PASSWORD: '/api/auth/passwordreset',
        API_ACCOUNT_UPDATE_PASSWORD: '/api/auth/passwordupdate',
        API_NOTIFICATIONS_LATEST: '/api/notifications/latest',
        API_QUERY_SUSCRIPCIONES: '/api/users/subscriptions'

    },
    FORM:{
        USER_INFO: 'profile',
        CHATBOTS: 'chatbots'
    },
    DEFAULT_INTENTS: [
        {
            idChatbot: "",
            name: "None",
            systemDefined: true,
            description: "Default answer for all inquiries with no match",
            domain: "Default",
            answer: {
                "type":"text",
                "text":"Lo siento, no se entendio. ¿ Puede reformular ?"
                },
            "examples":["None"],
            "entity":"None"
        },
        {
            idChatbot: "",
            name: "ON_OPEN_WIDGET",
            systemDefined: true,
            description: "Message answer trigger when user open the chat window",
            domain: "Default",
            answer: {
                "type":"text",
                "text":"Hola"
                },
            "examples":["ON_OPEN_WIDGET"],
            "entity":"ON_OPEN_WIDGET"
        }
    ]
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
