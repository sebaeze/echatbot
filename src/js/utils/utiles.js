/*
*
*/
import ls                                 from 'local-storage' ;
import translate                          from "../../config/translate.json" ;
import localeES                           from 'antd/es/date-picker/locale/es_ES';
import localeBR                           from 'antd/es/date-picker/locale/pt_BR';
import localeEN                           from 'antd/es/date-picker/locale/en_US';
//
import localePaginationEN                 from 'rc-pagination/es/locale/en_US' ;
import localePaginationES                 from 'rc-pagination/es/locale/es_ES' ;
import localePaginationPT                 from 'rc-pagination/es/locale/pt_BR' ;
//
import {PARAMETROS}                       from './parametros'  ;
//
export const languageLocale = (argUserLang=false) => {
    let outLocate = localeEN ;
    try {
        //
        let tempLenguaje   = ls( PARAMETROS.SESSION.LANGUAGE ) ;
        console.log('...(A) tempLenguaje: ',tempLenguaje) ;
        //
        if ( argUserLang==false ){
            if ( !tempLenguaje ){
                tempLenguaje = navigator.language || navigator.languages[0] || "EN" ;
            }
        } else {
            tempLenguaje = argUserLang ;
        }
        console.log('...(B) tempLenguaje: ',tempLenguaje) ;
        //
        // let tempLenguaje   = argUserLang!=false ? argUserLang : (navigator.language || navigator.languages[0] || "EN") ;
        //
        tempLenguaje       = tempLenguaje.substr(0,2).toUpperCase() ;
        let tempLocaleBI   = translate[tempLenguaje] || {} ;
        ls( PARAMETROS.SESSION.LANGUAGE, tempLenguaje ) ;
        //
        switch( tempLenguaje ){
          case 'ES':
              outLocate = localeES ;
              outLocate.pagination = localePaginationES ;
          break ;
          case 'EN':
              outLocate = localeEN ;
              outLocate.pagination = localePaginationEN ;
          break ;
          case 'PT':
              outLocate = localeBR ;
              outLocate.pagination = localePaginationPT ;
          break ;
          default : /* nada */  break ;
        }
        outLocate = Object.assign({...tempLocaleBI},outLocate) ;
    } catch(errGL){
        console.dir(errGL) ;
    }
    return outLocate ;
}
//
export const copy2Clipboard = (argText) =>{
    try {
        navigator.clipboard.writeText( argText ) ;
    } catch(errC2C){
        console.log('.....ERROR: copy2Clipboard:: errC2C: ',errC2C) ;
        throw errC2C ;
    }
}
//
export const widgetCode = ( argOptions ) => {
    return( `<script type="text/javascript" src="${argOptions.url}/widget.js?r${String(argOptions.ts_last_update).replace(/([-.:])/g,'')}"></script>
<script>
    window.addEventListener('load',function () {
        window.waiboc.initChatbotWidget({
            idAgent: '${argOptions._id}',
            secret: '${argOptions.secret}'
        }) ;
    }) ;
</script>` ) ;
}
//