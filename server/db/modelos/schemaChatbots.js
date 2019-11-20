/*
*
*/
import mongoose, { Schema }           from 'mongoose' ;
mongoose.set('useCreateIndex', true);
const moment = require('moment-timezone')     ;
//
module.exports.status = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    OUT_OF_PLAN: 'OUT_OF_PLAN'
}
//
module.exports.schema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    idUser: {type: String,default: '' } ,
    type: {type: String,default: 'NLP' },
    plan: {type: String,default: 'FREE' },
    planMaxMessages: { type: Number, default: 600 } ,
    qtyMessages: { type: Number, default: 0 } ,
    trainning: { default: {} },
    cssStyle: { default: {} },
    botIcon: { data: Buffer, contentType: String },
    botName: {type: String,default: 'Ayuda' },
    botSubtitle: {type: String,default: 'En Linea' },
    language: {type: String,default: 'es' },
    description: {type: String,default: '' },
    accessList:{ type: Array, default: [] },
    status:{ type: String, uppercase: true, default:'ACTIVE', enum:['ACTIVE','INACTIVE','OUT_OF_PLAN'] },
    ts_creation: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_last_update: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_last_login: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_out_of_plan: { type: Date, default: null },
    ts_inactive: { type: Date, default: null },
}) ;
//