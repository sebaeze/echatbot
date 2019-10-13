/*
*
*/
export const capitalPlural = (argStr,argFlag=false) => {
    let outStr = String(argStr).toUpperCase().trim() ;
    try {
        outStr = outStr.substr(0,1).toUpperCase() + outStr.substr(1) ;
        if ( argFlag==true && outStr.substr((outStr.length-1),1)!="s" ){
            switch( outStr.substr((outStr.length-2),2) ){
                case 'ed': outStr += 'es' ; break ;
                case 'or': outStr += 'es' ; break ;
                default: outStr+="s" ; break ;
            }
        }
    } catch(errCP){ console.dir(errCP);  }
    return outStr ;
}
//