/*
*
*/
//
import translate                          from "../../config/translate.json" ;
import localeES                           from 'antd/es/date-picker/locale/es_ES';
import localeBR                           from 'antd/es/date-picker/locale/pt_BR';
import localeEN                           from 'antd/es/date-picker/locale/en_US';
//
export const languageLocale = () => {
    let outLocate = localeEN ;
    try {
        let tempLenguaje   = navigator.language || navigator.languages[0] || "EN" ;
        tempLenguaje       = tempLenguaje.substr(0,2).toUpperCase() ;
        let tempLocaleBI   = translate[tempLenguaje] || {} ;
        switch( tempLenguaje ){
          case 'ES': outLocate = localeES ; break ;
          case 'EN': outLocate = localeEN ; break ;
          case 'PT': outLocate = localeBR ; break ;
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
    return(
`<script type="text/javascript" src="${argOptions.url}/widget.js?r${String(argOptions.ts_last_update).replace(/([-.:])/g,'')}"></script>
<script>
    window.addEventListener('load',function () {
        window.waiboc.initChatbotWidget({
            idAgent: '${argOptions._id}',
            options:{
                botName: '${argOptions.botName}',
                botSubtitle: '${argOptions.botSubtitle}',
                senderPlaceholder: '${argOptions.senderPlaceholder}',
                botStatus: '${argOptions.botStatus}'
            },
            defaultStyle:{
                fontSize:'${argOptions.cssStyle}'
            }
        }) ;
    }) ;
</script>`
    ) ;
}
//