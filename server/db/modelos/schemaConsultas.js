/*
*
*/
import mongoose, { Schema }           from 'mongoose' ;
mongoose.set('useCreateIndex', true);
const moment = require('moment-timezone')     ;
//
module.exports = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    nombre: {type: String,default: '' } ,
    email: {type: String,default: '' },
    subject: {type: String,default:'' },
    mensaje: {type: String,default: '' },
    respuesta: {type: String,default: '' },
    ts_consulta: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") }
}) ;
//