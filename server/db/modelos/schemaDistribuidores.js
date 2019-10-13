/*
*
*/
import mongoose, { Schema }           from 'mongoose' ;
mongoose.set('useCreateIndex', true);
const moment = require('moment-timezone')     ;
//
module.exports = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    // _id: {type: String, unique : true, required : true },
    idGenerico: {type: String, default:''},
    nombre: {type: String,default: 'N/A' } ,
    razonSocial: {type: String,unique : true, required : true, index: true },
    email: {type: String,default:'' },
    marca: {type: String,default: '' },
    descripcion: {type: String,default: '' },
    direccion: {type: String,default: '' },
    codigoPostal: {type: String,default: '' },
    pais: {type: String,default: 'AR' },
    provincia: {type: String,default: '' },
    ciudad: {type: String,default: '' },
    coordenadas: {type: Object, default: {} } ,
    barrio: {type: String,default: '' },
    telefono: {type: String,default: '' },
    urlGoogleMaps: {type: String,default: '' },
    url: {type: String,default: '' },
    tipoProductos: {type: String,default: '' },
    categoria: {type: String,default: '' },
    textoBusqueda: {type: String, default: ''},
    atributos: {type: Array,default:[]},
    ts_ingreso: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_ultima_modificacion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_baja: { type: Date, default: null }
}) ;
//