const fs                = require('fs')    ;
const http              = require('http')  ;
const https             = require('https') ;
const path              = require('path')  ;
const axios             = require('axios') ;
//
let tempReqbody = {isAgent: 'test', secret:'zxc@asdqwe54321'}    ;
let argConfig   = fs.readFileSync( path.join(__dirname,'../server/config/general.json'),'utf8' ) ;
argConfig       = JSON.parse( argConfig ) ;
let caCert      = fs.readFileSync( path.join(__dirname,'../server/cert/waiboc.com.fullchain.pem'),'utf8' ) ;
//
let API_NLP        = argConfig.API[process.env.AMBIENTE||'dev'] || false ;
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create() ;
// var rootCas = require('ssl-root-cas/latest').create() ;
var rootCas = require('ssl-root-cas/latest').inject().addFile( path.join(__dirname,'../server/cert/waiboc.com.fullchain.pem') );
// var rootCas = fs.readFileSync( path.join(__dirname,'../server/cert/waiboc.com.fullchain.pem'), 'utf8' );
// https.globalAgent.options.ca = rootCas;
//
console.log('....API_NLP.NLP_TRAIN: ',API_NLP.NLP_TRAIN) ;
let reqOptions = {
    url: API_NLP.NLP_TRAIN,
    method: 'POST',
    data: tempReqbody,
    ca: caCert
    // httpAgent: new http.Agent({ keepAlive: true }),
    //httpsAgent: new https.Agent({ keepAlive: true  /* ca: caCert, ...API_NLP.NLP_TRAIN.OPTIONS, defaultPort: 3001 */ })
    // httpsAgent: httpsAgent
} ;
console.log('...reqOptions:: ',reqOptions,' \n httpsAgent: '+reqOptions.httpsAgent) ;
// return axios.post( API_NLP.NLP_TRAIN , tempReqbody ) ;
axios( reqOptions )
    .then((respAX)=>{
        console.log('.....then_1: respAX: ',respAX) ;
    })
    .catch((respEE)=>{
        console.log('.....catch:: respEE: ',respEE) ;
    })
//