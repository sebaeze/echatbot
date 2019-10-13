/*
*
*/
//
const convertir2Promise = (argObj,argFn,argPass,argPass2) => {
    return new Promise(function(respResult,respReject){
        try {
            let tempFn       = argFn ;
            let outResultado = '' ;
            if ( typeof argObj=="object" ){
                tempFn = argObj[argFn] ;
            }
            outResultado = tempFn(argPass,argPass2) ;
            //
            respResult(outResultado) ;
        } catch(errPRom){
            respReject(errPRom) ;
        }
    })
} ;
//
//
const valoresFormulario = (argNodo) => {
    let outObj = {} ;
    try {
      //
      let arrayInput = $(argNodo+' textarea,'+argNodo+' input[type=text],'+argNodo+' input[type=email],'+argNodo+' input[type=checkbox]') ;
      for(let keyForm in arrayInput ){
        let elemText    = arrayInput[keyForm] ;
        if ( elemText.tagName=="INPUT" || elemText.tagName=="TEXTAREA" ){
          let tipo        = $(elemText).attr("tipodatos") || $(elemText).attr("tipoDatos") || elemText.name || elemText.id ;
          if ( String(elemText.type).toUpperCase()=="CHECKBOX"){
            outObj[tipo] = $(elemText).prop('checked') ;
          } else {
            outObj[tipo] = elemText.value || '' ;
          }
        }
        //
      } ;
      //
    } catch(errVal){
      console.dir(errVal) ;
      throw errVal ;
    }
    return outObj ;
} ;
//
const enviarEstadisticas = (argTipoStat,argInfoAddicional) => {
  return new Promise(function(respResu,respRej){
    try {
      //
      const objEmail     = {method:'POST',body:JSON.stringify( {tipo:argTipoStat,...argInfoAddicional} ),
                            headers:{
                                 'Accept':'application/json',
                                 'Content-Type':'application/json',
                                 'accept':'application/json',
                                 'access-Control-Allow-Origin':'*',
                                 'access-Control-Allow-Methods':'*'
                                }
                            } ;
      //
      fetch( '/estadisticas' ,objEmail)
          .then(function(response){
              if (response.status>=200 & response.status<=400) {
                  return response.json() ;
              } else {
                  throw new Error("ERROR: Enviando estadistica. Http Status: "+response.status+'.') ;
              }
          })
          .then(function(respDatos){
              respResu('ok') ;
          })
          .catch(function(respRechaz){
              console.dir(respRechaz) ;
              respRej(respRechaz) ;
          }) ;
          //
    } catch(errConsulta){
      respRej(errConsulta) ;
    }
  }.bind(this)) ;
}
//
const spinner = (argFlagActivar,argNodoID) => {
	let parentNodeArg   ;
  let cssClassSpinner = 'simple-loader' ;
	try {
		if ( typeof argNodoID=="string" ){
			parentNodeArg = document.getElementById(argNodoID.replace('#','')) ;
		} else {
			if ( argNodoID.tagName ){
				parentNodeArg = argNodoID ;
			} else {
				console.dir(argNodoID) ;
				console.log('argNodoID: '+argNodoID+';');
				throw new Error('spinner:: arg no es string ni nodo: argNodoID: '+argNodoID+';') ;
			}
    }
    //
    if ( !parentNodeArg ){
      console.log('....nodo no existe: '+argNodoID) ;
      return false;
    }
    //
    if ( String(parentNodeArg.tagName).toUpperCase()=="BUTTON" ){
      parentNodeArg.classList.add('botonDesabilitado') ;
    }
    //
		let loadingID     = parentNodeArg.id+'_spinner_id';
		let loadingP      = null ;
		if ( argFlagActivar==true ){
      //
      let divSpinner  = document.createElement('div') ;
      cssClassSpinner = 'simple-loader' ;
      divSpinner.classList.add( cssClassSpinner ) ;
      //
      if ( $('#'+loadingID).length==0  ){
        divSpinner.id = loadingID ;
        if ( String(parentNodeArg.tagName).toUpperCase()=="BUTTON" ){
          let nodoDivParent = $(parentNodeArg).parents().eq(0) ;
          $(nodoDivParent).append( divSpinner ) ;
        } else {
          parentNodeArg.appendChild(divSpinner)   ;
        }
      }
      //
		} else {
			//console.log('false::argNodoID: '+argNodoID+' loadingID: '+loadingID+';');
			loadingP = document.getElementById(loadingID) ;
			if ( loadingP ){
        loadingP.parentElement.removeChild(loadingP);
        if ( parentNodeArg.classList.contains('botonDesabilitado') ){
          parentNodeArg.classList.remove('botonDesabilitado') ;
        }
			}
		}
	} catch( errLS ){
    console.log('loaddingSpinner_error: '+errLS+' argNodoID.id: '+parentNodeArg.id+';');
    console.dir(errLS) ;
	}
};
//
export const util = {
    toPromise: convertir2Promise,
    valoresForm: valoresFormulario,
    enviarEstadisticas: enviarEstadisticas,
    spinner: spinner
} ;
//