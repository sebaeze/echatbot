/*
*
*/
/*
let tempURLbackend = process.env.AMBIENTE=="produccion" ? "https://www.waiboc.com:3001" : "http://localhost:3001" ;
let tempIDwidget   = process.env.AMBIENTE=="produccion" ? "5de8f8e043c9ad235319c06d"    : "5df990135940bb454c846a1e";
let tempHashBuild  = String(new Date().toISOString()).replace(/([-.:])/g,'') ;
*/
//
module.exports.HASH_VERSION = {
    hashVersion: String(new Date().toISOString()).replace(/([-.:])/g,'') ,
    IDwidget: process.env.AMBIENTE=="produccion" ? "5de8f8e043c9ad235319c06d"    : "5df990135940bb454c846a1e",
    URLbackend: process.env.AMBIENTE=="produccion" ? "https://www.waiboc.com:3001" : "http://localhost:9001" /* "http://localhost:3001" */
}