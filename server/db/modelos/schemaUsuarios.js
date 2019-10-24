/*
*
*/
import mongoose, { Schema }           from 'mongoose' ;
mongoose.set('useCreateIndex', true);
const moment = require('moment-timezone')     ;
//
module.exports = new Schema({
    _id: String ,
    email: {type: String,default: '' } ,
    name: {type: String,default: '' },
    lastName: {type: String,default:'' },
    fullName: {type: String,default: '' },
    country: {type: String,default: '' },
    state: {type: String,default: '' },
    city: {type: String,default: '' },
    zipCode: {type: String,default: '' },
    address:{type: Array, default:[]},
    phone: {type: Array, default:[]},
    whatsapp: {type: Array, default:[]},
    description:{type: String, default:'' },
    fotos: {type: Array, default:[{id:"no_disponible_1",url:"/img/images_no_disponible.png",secure_url:"/img/images_no_disponible.png"}] },
    provider: {type: Object, default: {} } ,
    seguridad: {type:Object, default:{administrador:false}} ,
    accesos: [],
    suscripcion: {type: Boolean, default: false  },
    ordenes: {type: Array, default:[]},
    dialogs: {type:Object, default:{}},
    log:{type: Array, default:[]},
    ts_suscripcion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_creation: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_last_update: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_last_login: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_cancel: { type: Date, default: null }
}) ;
//