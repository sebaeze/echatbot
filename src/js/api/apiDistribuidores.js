/*
*
*/
import { PARAMETROS, obj2qryString }          from '../utils/parametros'       ;
//
const queryDistribuidores = (argQry) => {
    return new Promise(function(respDatos,respRech){
        try {
          //
          if ( !argQry.limite ){ argQry.limite=50; }
          let urlBusqueda = PARAMETROS.BACKEND.API_DISTRIBUIDORES + obj2qryString(argQry) ;
          //
          fetch( urlBusqueda ,{method:'GET',accept:'application/json',contentType:'application/json'})
             .then(function(response){
                 if (response.status>=200 & response.status<=400) {
                     return response.json() ;
                 } else {
                     throw new Error("ERROR: Buscando lista de distribuidores. Http Status: "+response.status+'.') ;
                 }
             })
             .then((argJson     ) => { respDatos(argJson) ; })
             .catch((respRechaz ) => { respRech(respRechaz) ; }) ;
             //
        } catch(errListProd){
            respRech(errListProd) ;
        }
     }) ;
}
//
export const distribuidores = {
    get: queryDistribuidores
}