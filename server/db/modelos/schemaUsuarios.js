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
    nombre: {type: String,default: '' },
    apellido: {type: String,default:'' },
    fullNombre: {type: String,default: '' },
    provider: {type: Object, default: {} } ,
    seguridad: {type:Object, default:{administrador:false}} ,
    accesos: [],
    fotos: {type: Array, default:[{id:"no_disponible_1",url:"/img/images_no_disponible.png",secure_url:"/img/images_no_disponible.png"}] },
    suscripcion: {type: Boolean, default: false  },
    ordenes: {type: Array, default:[]},
    ts_suscripcion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_ingreso: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_ultima_modificacion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_baja: { type: Date, default: null }
}) ;
//