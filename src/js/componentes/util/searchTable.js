/*
*
*/
export const searchTextInArray = (argArray,argText,argArrayKey=false) => {
    try {
        let outArrayDatos = [] ;
        if ( argText.length==0 ){
            outArrayDatos = argArray.map((elemTC,elemIdx)=>{
                return {
                    ...elemTC,
                    key: argArrayKey==false ? elemIdx : elemTC[argArrayKey]
                } ;
            }) ;
        } else {
            argArray.forEach((elemTC,elemIdx)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(argText.toUpperCase())!=-1 ){
                    outArrayDatos.push( {
                        ...elemTC,
                        key: argArrayKey==false ? elemIdx : elemTC[argArrayKey]
                    } ) ;
                }
            }) ;
        }
        return outArrayDatos ;
    } catch(errST){
        console.log('...ERROR: ',errST) ;
        throw errST ;
    }
} ;
//