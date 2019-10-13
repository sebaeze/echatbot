/*
*   Busqueda de informacion de mercadolibre
*/
const path                 = require('path') ;
const MercadolibreGeneric  = require( path.join(__dirname,'./mercadolibreGeneric') ).class ;
//
class MercadolibreProductos extends  MercadolibreGeneric {
    constructor( argConfigML ){
        super(argConfigML) ;
    }
    //
    buscarSincronizarProductosPorNombre(argQry){
        return new Promise(function(respData,respRej){
            try {
                //
                this.buscarProductosMlOffset(argQry,0,50)
                    .then(datosOffset0 => {
                        return this.buscaTodosOffsetMercadolibre(datosOffset0,this.buscarProductosMlOffset.bind(this), argQry) ;
                    })
                    .then(datosOffTodos => {
                        respData( datosOffTodos ) ;
                    })
                    .catch(errProd =>{
                        respRej( errProd ) ;
                    })
                    //
            } catch(errProdTodos){
                respRej(errProdTodos) ;
            }
        }.bind(this)) ;
    }
    //
    buscarProductosMlOffset(argQry,argOffSet,argLimite=50){
        return new Promise(function(respData,respRej){
            try {
                //
                if ( !argQry.nombreProducto ){ throw new Error('buscarProductosMlOffset::Falta parametro: '+nombreProducto+';') ; }
                argQry.nombreProducto = argQry.nombreProducto.replace(/\s/g, "+");
                let mlReq = {method:'GET',uri: '',contentType: 'application/json',accept: 'application/json',
                             uri: 'https://api.mercadolibre.com/sites/MLA/search?q=' + argQry.nombreProducto
                                + '&offset='+argOffSet+'&limit='+argLimite
                                + (this.tokenId ? '&access_token='+this.tokenId : '')
                            } ;
                //
                console.log('busca_prod: '+mlReq.uri+';') ;
                this.requestPromise( mlReq )
                    .then(mlVisitas => {
                        return JSON.parse(mlVisitas) ;
                    })
                    .then(mlVisitasParsed => {
                        respData(mlVisitasParsed) ;
                    })
                    .catch(mlError => {
                        console.dir(mlError) ;
                        respRej( mlError ) ;
                    }) ;
                //
            } catch(errUser){
                respRej(errUser) ;
            }
        }.bind(this)) ;
    }
    //
    iniciarSincronizacionSellerId(argSellerId){
        return new Promise(function(respDatos,respRej,argTsSincronizacion=(new Date().toISOString())){
            try{
                //
                this.productosSegunSellerOffset(argSellerId,0,50)
                    .then(function(datosOffset0){
                        if ( datosOffset0.results.length==datosOffset0.paging.total ){
                            return datosOffset0.results ;
                        } else {
                            //return this.buscarProductosPendientes(argSellerId,datosOffset0.results,datosOffset0.paging.limit,datosOffset0.paging.total) ;
                            console.log('\n\n ***** buscaTodosOffsetMercadolibre *** \n\n') ;
                            return this.buscaTodosOffsetMercadolibre(datosOffset0,this.productosSegunSellerOffset.bind(this),argSellerId) ;
                        }
                    }.bind(this))
                    .then(function(datosOffset1){
                        return this.parseArray2objeto(datosOffset1,argSellerId) ;
                    }.bind(this))
                    .then(function(productosMl){
                        return this.getItemDetalles(productosMl) ;
                    }.bind(this))
                    /*
                    .then(function(productosMlDetalles){
                        return this.getItemDescripcion(productosMlDetalles) ;
                    }.bind(this))
                    */
                    .then(function(prodMlConDetalle){
                        return this.getItemVisitas(prodMlConDetalle) ;
                    }.bind(this))
                    .then(function(datosAdded){
                        // Agrega timestamp de sincronizacion
                        for ( let keyProd in  datosAdded ){
                            datosAdded[keyProd].ts_sincronizacion = argTsSincronizacion
                        }
                        respDatos( datosAdded ) ;
                    }.bind(this))
                    .catch(errPRod => {
                        console.log('...estoy en .catch superior de iniciarSincronizacionSellerId ') ;
                        console.dir(errPRod) ;
                        respRej(errPRod) ;
                    })
                //
            } catch(errSinc){
                console.dir(errSinc) ;
                respRej(errSinc) ;
            }
        }.bind(this)) ;
    }
    //
    parseProductosVendedor(argArrayResult,argSellerId){
        let tempObj2actualizar = {
            _id: argSellerId,
            vendedorId: argSellerId,
            cantidadProductos: 0,
            stock: 0,
            vendidos: 0,
            categoriasTitulo:{}
        } ;
        try {
            tempObj2actualizar.cantidadProductos = argArrayResult.length ;
            for(let posRes=0;posRes<argArrayResult.length;posRes++){
                let objProd                          = argArrayResult[posRes] ;
                let categoriaSegunTitulo             = String(objProd.title).toUpperCase().split(' ') ;
                categoriaSegunTitulo                 = categoriaSegunTitulo[0] ;
                switch(categoriaSegunTitulo){
                    case 'IMPRESORA':     tempObj2actualizar.categoriaPrimaria='IMPRESORAS' ;     break ;
                    case 'FOTOCOPIADORA': tempObj2actualizar.categoriaPrimaria='FOTOCOPIADORAS' ; break ;
                    default:  tempObj2actualizar.categoriaPrimaria='INSUMOS' ; break ;
                }
                tempObj2actualizar.stock            += objProd.available_quantity ;
                tempObj2actualizar.vendidos         += objProd.sold_quantity ;
                if ( !tempObj2actualizar.categoriasTitulo[categoriaSegunTitulo] ){
                    tempObj2actualizar.categoriasTitulo[categoriaSegunTitulo] = {
                        cantidad: 0,
                        nombre: categoriaSegunTitulo
                    }
                }
                tempObj2actualizar.categoriasTitulo[categoriaSegunTitulo].cantidad++ ;
            }
            //
        } catch(errArray2Obj){
            throw errArray2Obj ;
        }
        return tempObj2actualizar ;
    }
    //
    parseArray2objeto(argArrayResult,argSellerId){
        let tempObj2actualizar = {} ;
        try {
            //
            if ( typeof argArrayResult=="string" ){
                argArrayResult = JSON.parse(argArrayResult);
                if ( argArrayResult.results && argArrayResult.results.length>0 ){
                    argArrayResult = argArrayResult.results ;
                }
            }
            //
            for(let posRes=0;posRes<argArrayResult.length;posRes++){
                let objProd = argArrayResult[posRes] ;
                objProd._id                      = objProd.id  ;
                objProd.urlId                    = objProd.id + "-" + objProd.title ;
                objProd.urlExterna               = objProd.permalink ;
                objProd.sellerId                 = argSellerId ;
                objProd.title                    = String(objProd.title).trim() ;
                objProd.nombre                   = String(objProd.title).trim() ;
                objProd.precio                   = objProd.price || objProd.base_price ;
                objProd.vendidos                 = objProd.sold_quantity || 0 ;
                objProd.flagMercadolibre         = true ;
                objProd.estadoProducto           = 'ACTIVO' ;
                delete objProd.sold_quantity ;
                objProd.marca                    = '' ;
                /*  */
                objProd.categoriaSegunTitulo     = String(objProd.title).toUpperCase().split(' ') ;
                objProd.categoriaSegunTitulo     = objProd.categoriaSegunTitulo[0] ;
                objProd.categoriaSuperior        = 'EQUIPO' ;
                switch( objProd.categoriaSegunTitulo ){
                    case 'IMPRESORA':      objProd.categoriaSuperior = 'EQUIPO'    ; break ;
                    case 'FOTOCOPIADORA':  objProd.categoriaSuperior = 'EQUIPO'    ; break ;
                    case 'MULTIFUNCION':   objProd.categoriaSuperior = 'EQUIPO'    ; break ;
                    case 'TONER':          objProd.categoriaSuperior = 'ACCESORIO' ; break ;
                    case 'CHIP':           objProd.categoriaSuperior = 'ACCESORIO' ; break ;
                    case 'CARTUCHO':       objProd.categoriaSuperior = 'ACCESORIO' ; break ;
                    case 'CUCHILLA':       objProd.categoriaSuperior = 'ACCESORIO' ; break ;
                    default:               objProd.categoriaSuperior = 'ACCESORIO' ; break ;
                }
                /*  */
                switch(objProd.categoriaSegunTitulo){
                    case 'IMPRESORA':     objProd.categoriaPrimaria='IMPRESORAS' ;     break ;
                    case 'FOTOCOPIADORA': objProd.categoriaPrimaria='FOTOCOPIADORAS' ; break ;
                    default:              objProd.categoriaPrimaria='INSUMOS' ; break ;
                }
                /*  */
                if ( !objProd.attributes ){ objProd.attributes=[]; }
                objProd.atributos = objProd.attributes ;
                for(let indProd=0;indProd<objProd.attributes.length;indProd++){
                    let objAttributo = objProd.attributes[indProd] ;
                    switch( objAttributo.id ){
                        case 'BRAND':          objProd.marca           =  objAttributo.value_name || '' ; break ;
                        case 'MODEL':          objProd.modelo          =  objAttributo.value_name || '' ; break ;
                        case 'MANUFACTURER':   objProd.paisFabricante  =  objAttributo.value_name || '' ; break ;
                        case 'PAGE_YIELD'  :   objProd.rendimiento     =  objAttributo.value_name || '' ; break ;
                        case 'COMPATIBLE_CARTRIDGE'   : objProd.cartuchoCompatible =  objAttributo.value_name || '' ; break ;
                        case 'COMPATIBLE_DEVICE_BRAND':
                                // if ( objProd.marca.length==0 ){ objProd.marca=objAttributo.value_name || '' ; }
                                objProd.marcaCompatible = objAttributo.value_name || '' ;
                        break ;
                        case 'COMPATIBLE_DEVICE_MODEL': objProd.marcaCompatible    =  objAttributo.value_name || '' ; break ;
                        case 'COMPATIBLE_TONER_COLOR' : objProd.tonerCompatible    =  objAttributo.value_name || '' ; break ;
                        case 'PRINTER_TYPE':   objProd.tipoImpresora =  objAttributo.value_name || '' ; break ;
                        case 'PRINTING_TYPE':  objProd.tipoImpresion =  objAttributo.value_name || '' ; break ;
                        case 'WITH_USB':       objProd.conUsb        =  objAttributo.value_name || '' ; break ;
                        case 'WITH_WI_FI':     objProd.conWifi       =  objAttributo.value_name || '' ; break ;
                        case 'ITEM_CONDITION': objProd.condicion     =  objAttributo.value_name || '' ; break ;
                        default:
                        break;
                    }
                }
                if ( objProd.marca.length==0 ){
                    objProd.marca = String(objProd.title).replace(/,/g,' ').replace(/\+/g,' ').split(' ') ;
                    switch( String(objProd.marca[0]).toUpperCase() ){
                        case 'IMPRESORA': objProd.marca=objProd.marca[2] ; break ;
                        case 'CARTUCHO' : objProd.marca=objProd.marca[2] ; break ;
                        case 'TONER'    : objProd.marca=objProd.marca[1] ; break ;
                        case 'CHIP'     : objProd.marca=objProd.marca[1] ; break ;
                        case 'FUSOR'    : objProd.marca=objProd.marca[1] ; break ;
                        case 'KIT'      : objProd.marca=objProd.marca[2] ; break ;
                        case 'UNIDAD'   : objProd.marca=objProd.marca[2] ; break ;
                        case 'COMPATIBLE':    objProd.marca=objProd.marca[2] ; break ;
                        case 'CILINDRO':      objProd.marca=objProd.marca[1] ; break ;
                        case 'FOTOCOPIADORA': objProd.marca=objProd.marca[1] ; break ;
                        default:
                            console.log('....nose que esta marca: '+String(objProd.marca[0]).toUpperCase()+' title: '+objProd.title+';') ;
                        break ;
                    }
                }
                if ( objProd.marca.length==0 ){ objProd.marca='ALTERNATIVO'; }
                objProd.marca = String(objProd.marca).toUpperCase() ;
                //
                objProd.textoBusqueda = objProd.id+' '+objProd.title+' '+objProd.marca+' '+objProd.modelo+' '+objProd.categoriaPrimaria+' '+objProd.categoriaSegunTitulo+' '+objProd.precio+' '+objProd.condicion;
                objProd.textoBusqueda = String(objProd.textoBusqueda).toUpperCase() ;
                //
                /*    */
                tempObj2actualizar[ objProd.id ] = objProd ;
                /*    */
            }
            //
        } catch(errArray2Obj){
            throw errArray2Obj ;
        }
        return tempObj2actualizar ;
    }
    //
    buscarProductosPendientes(argSellerId,argDatosOffset0,argLimit,argTotal){
        return new Promise(function(respDatos,respRej){
            try{
                //
                let offsetFaltan = argTotal/argLimit ;
                offsetFaltan     = Math.ceil( parseInt(offsetFaltan) ) ;
                //
                let arrayDatos     = argDatosOffset0 ;
                let arrayPromises  = [] ;
                let offSetPosicion = argDatosOffset0.length ? argDatosOffset0.length : 0 ;
                for(let posProm=1;posProm<=offsetFaltan;posProm++){
                    offSetPosicion++ ;
                    if ( offSetPosicion>argTotal ){
                        let faltantes   = offSetPosicion - argTotal ;
                        offSetPosicion -= faltantes ;
                    }
                    arrayPromises.push( this.productosSegunSellerOffset(argSellerId,offSetPosicion,argLimit) ) ;
                    offSetPosicion += argLimit ;
                }
                //
                Promise.all( arrayPromises )
                        .then(function(respPromises){
                            for( let posArr=0;posArr<respPromises.length;posArr++){
                                arrayDatos = arrayDatos.concat( respPromises[posArr].results ) ;
                            }
                            respDatos(arrayDatos) ;
                        }.bind(this))
                        .catch(errorAll => {
                            console.log('....algo fallo en las promisesss ')  ;
                            console.dir(errorAll) ;
                            respRej(errorAll) ;
                        }) ;
                //
            } catch(errSinc){
                console.dir(errSinc) ;
                respRej(errSinc) ;
            }
        }.bind(this)) ;
    }
    //
    productosSegunSellerOffset(argSellerId,argOffset=0,argLimit=50){
        return new Promise(function(respDatos,respRej){
            try{
                let tempId = (typeof argSellerId=="object") ? argSellerId.id : argSellerId ;
                let mlReq = {method:'GET',uri: '',contentType: 'application/json',accept: 'application/json',
                                uri: 'https://api.mercadolibre.com/sites/MLA/search?seller_id=' + tempId
                                + '&offset='+argOffset+'&limit='+argLimit
                                + (this.tokenId ? '&access_token='+this.tokenId : '')
                            } ;
                //
                console.log('busca_productos_sellerId_: '+mlReq.uri+';') ;
                this.requestPromise( mlReq )
                    .then(mlVisitas => {
                        return JSON.parse(mlVisitas) ;
                    })
                    .then(mlVisitasParsed => {
                        respDatos(mlVisitasParsed) ;
                    })
                    .catch(mlError => {
                        console.dir(mlError) ;
                        respRej( mlError ) ;
                    }) ;
                //
            } catch(errSinc){
                console.dir(errSinc) ;
                respRej(errSinc) ;
            }
        }.bind(this)) ;
    }
    //
    sincronizarProductos(argMiliSegundos=3600){ // Default de 1 hora
        return new Promise(function(respDatos,respRej){
            try{
                this.actualizaProductosMl() ;
                let tiempoIntervarlo = argMiliSegundos * 1000 ;
                let intervaloSincro  = setInterval(function(){
                    console.log(new Date().toISOString()+'..sincronizarProductos::') ;
                    this.actualizaProductosMl() ;
                }.bind(this), tiempoIntervarlo ) ;
                respDatos(intervaloSincro) ;
                //
            } catch(errSinc){
                console.dir(errSinc) ;
                respRej(errSinc) ;
            }
        }.bind(this)) ;
    }
    //
    getItemDetalles(argMlProductos){
        return new Promise(function(respDatos,respRej){
            try {
                //
                const detalleItem = (argIds) => {
                    try{
                        let listaIds   = argIds.join(',') ;
                        let mlReq      = {method:'GET',uri: 'https://api.mercadolibre.com/items',contentType: 'application/json',accept: 'application/json'} ;
                        mlReq.uri = mlReq.uri + ((argIds.length==1) ? '/' : '?ids=' ) + listaIds ;
                        return this.requestPromise( mlReq ) ;
                    } catch(errDet){ throw errDet; }
                }
                //
                let tempArrayIds         = Object.keys(argMlProductos) ;
                let arrayPromisesDetalle = [] ;
                let arrayIds10           = [] ;
                for(let insArr=0;insArr<tempArrayIds.length;insArr++){
                    if ( arrayIds10.length>18 ){
                        arrayPromisesDetalle.push( detalleItem(arrayIds10)  ) ;
                        arrayIds10 = [] ;
                    }
                    arrayIds10.push( tempArrayIds[insArr] ) ;
                }
                if ( arrayIds10.length>0 ){ arrayPromisesDetalle.push( detalleItem(arrayIds10)  ) ; }
                //
                Promise.all( arrayPromisesDetalle )
                        .then(function(respPromises){
                            let tempArrayParsed = respPromises.map(function(arrayItems){return JSON.parse(arrayItems) ;}) ;
                            return tempArrayParsed ;
                        }.bind(this))
                        .then(function(arrayDeArray){
                            let tempArrayProductos = [] ;
                            for(let indArrArr=0;indArrArr<arrayDeArray.length;indArrArr++){
                                let tempArr = arrayDeArray[indArrArr] ;
                                if ( Array.isArray(tempArr) ){
                                    tempArr.forEach(elemAr => {
                                        tempArrayProductos.push( elemAr ) ;
                                    }) ;
                                } else {
                                    tempArrayProductos.push( tempArr ) ;
                                }
                            }
                            return tempArrayProductos ;
                        }.bind(this))
                        .then(function(arrayProductos){
                            for(let posArr=0;posArr<arrayProductos.length;posArr++){
                                let objProdMasInfo = arrayProductos[posArr].body || arrayProductos[posArr] || false ;
                                if ( objProdMasInfo ){
                                    let objProdDefault = argMlProductos[ objProdMasInfo.id]  || false ;
                                    if ( objProdDefault ){
                                        let tempObjProd = Object.assign(objProdDefault,objProdMasInfo) ;
                                        if ( tempObjProd.status && tempObjProd.status=="under_review" ){
                                            switch(tempObjProd.status){
                                                case "active": /*  */ ; break ;
                                                case "under_review": tempObjProd.estadoProducto = "BAJO_REVISION" ; break ;
                                                default:
                                                    console.log('....estado desconocido__id: '+tempObjProd.id+' estado: '+tempObjProd.status) ;
                                                break ;
                                            }
                                        }
                                        argMlProductos[ objProdMasInfo.id ] = tempObjProd ;
                                    } else {
                                        console.log('....No se encontro info para el detalle de producto__id: '+objProdMasInfo.id) ;
                                    }
                                } else {
                                    console.log('....no se encontro detalle para producto posArr: '+posArr+';') ;
                                }
                            }
                            respDatos(argMlProductos) ;
                        }.bind(this))
                        .catch(errorAll => {
                            console.log('....algo fallo en las promisesss ')  ;
                            respRej(errorAll) ;
                        }) ;
                //
            } catch(errGetItems){
                respRej(errGetItems) ;
            }
        }.bind(this)) ;
    }
    //
    getItemDescripcion(argMlProductos){
        return new Promise(function(respDatos,respRej){
            try {
                //
                const descripcionItem = (argId) => {
                    return new Promise(function(respDescId,respDescRech){
                        try{
                            let mlReq      = {method:'GET',uri: 'https://api.mercadolibre.com/items/'+argIds.trim(),contentType: 'application/json',accept: 'application/json'} ;
                            this.requestPromise( mlReq )
                                .then(function(respMlDesc){
                                    if ( typeof respMlDesc=="string" ){ respMlDesc=JSON.parse(respMlDesc); }
                                    respDescId( {id:argId,...respMlDesc}  )
                                }.bind(this))
                                .catch((respErrDesc)=>{ respDescRech(respErrDesc); })
                        } catch(errDet){ respDescRech(errDet); }
                    }.bind(this)) ;
                }
                //
                let arrayPromisesDetalle = [] ;
                let tempArrayIds         = Object.keys(argMlProductos) ;
                for(let insArr=0;insArr<tempArrayIds.length;insArr++){
                    arrayPromisesDetalle.push( descripcionItem(tempArrayIds[insArr])  ) ;
                }
                //
                Promise.all( arrayPromisesDetalle )
                        .then(function(respPromises){
                            let tempArrayParsed = respPromises.map(function(arrayItems){
                                if (typeof arrayItems=="string" ){ arrayItems=JSON.parse(arrayItems); }
                                return arrayItems ;
                            }) ;
                            return tempArrayParsed ;
                        }.bind(this))
                        .then(function(arrayDeArray){
                            let tempArrayProductos = [] ;
                            for(let indArrArr=0;indArrArr<arrayDeArray.length;indArrArr++){
                                let tempArr = arrayDeArray[indArrArr] ;
                                if ( Array.isArray(tempArr) ){
                                    tempArr.forEach(elemAr => {
                                        tempArrayProductos.push( elemAr ) ;
                                    }) ;
                                } else {
                                    tempArrayProductos.push( tempArr ) ;
                                }
                            }
                            return tempArrayProductos ;
                        }.bind(this))
                        .then(function(arrayProductos){
                            for(let posArr=0;posArr<arrayProductos.length;posArr++){
                                let objProdMasInfo = arrayProductos[posArr]  ;
                                let objProdDefault = argMlProductos[ objProdMasInfo.id]  || false ;
                                if ( objProdDefault==false ){
                                    console.log('***** ERRR: no se encontro descripcion/id: '+objProdMasInfo.id+' en productos::: ') ;
                                    console.dir(objProdMasInfo) ;
                                } else {
                                    argMlProductos[ objProdMasInfo.id ].descripcion = objProdDefault.plain_text || objProdDefault.text ;
                                }
                            }
                            respDatos(argMlProductos) ;
                        }.bind(this))
                        .catch(errorAll => {
                            console.log('....algo fallo en las promisesss ')  ;
                            respRej(errorAll) ;
                        }) ;
                //
            } catch(errGetItems){
                respRej(errGetItems) ;
            }
        }.bind(this)) ;
    }
    //
    getItemVisitas(argMlProductos){
        return new Promise(function(respDatos,respRej){
            try {
                //
                const visitasItem = (argId) => {
                    try{
                        let mlReq      = {method:'GET',uri: 'https://api.mercadolibre.com/items/'+argId+'/visits/time_window?last=300&unit=day',contentType: 'application/json',accept: 'application/json'} ;
                        return this.requestPromise( mlReq ) ;
                    } catch(errDet){ throw errDet; }
                }
                //
                let tempArrayIds         = Object.keys(argMlProductos) ;
                let arrayPromisesDetalle = [] ;
                for(let insArr=0;insArr<tempArrayIds.length;insArr++){
                    arrayPromisesDetalle.push( visitasItem(tempArrayIds[insArr])  ) ;
                }
                //
                Promise.all( arrayPromisesDetalle )
                        .then(function(respPromises){
                            let tempArrayParsed = respPromises.map(function(arrayItems){return JSON.parse(arrayItems) ;}) ;
                            return tempArrayParsed ;
                        }.bind(this))
                        .then(function(arrayDeArray){
                            let tempArrayProductos = [] ;
                            for(let indArrArr=0;indArrArr<arrayDeArray.length;indArrArr++){
                                let tempArr = arrayDeArray[indArrArr] ;
                                if ( Array.isArray(tempArr) ){
                                    tempArr.forEach(elemAr => {
                                        tempArrayProductos.push( elemAr ) ;
                                    }) ;
                                } else {
                                    tempArrayProductos.push( tempArr ) ;
                                }
                            }
                            return tempArrayProductos ;
                        }.bind(this))
                        .then(function(arrayProductos){
                            for(let posArr=0;posArr<arrayProductos.length;posArr++){
                                let objProdVisitas = arrayProductos[posArr].body || arrayProductos[posArr] ;
                                argMlProductos[objProdVisitas.item_id].visitasDetalle = objProdVisitas.results ;
                                // Cuenta cantidad total de visitas
                                let totalVisitas = 0 ;
                                for(let indVisitas=0;indVisitas<objProdVisitas.results.length;indVisitas++){
                                    totalVisitas += objProdVisitas.results[indVisitas].total || 0 ;
                                }
                                argMlProductos[objProdVisitas.item_id].visitasTotalMercadolibre = totalVisitas ;
                                argMlProductos[objProdVisitas.item_id].visitasTotal = totalVisitas ;
                            }
                            respDatos(argMlProductos) ;
                        }.bind(this))
                        .catch(errorAll => {
                            console.log('....algo fallo en las promisesss \n No Importa: Son solo detalles de visitaas que no se utiliza')  ;
                            respDatos(argMlProductos) ;
                            console.dir(errorAll) ;
                            console.log('....') ;
                            //respRej(errorAll) ;
                        }) ;
                //
            } catch(errGetItems){
                respRej(errGetItems) ;
            }
        }.bind(this)) ;
    }
    //
    cantidadDeVisitas2Seller(argSellerId,argFechaDesde,argFechaHast){
        return new Promise(function(respData,respRej){
            try {
                //
                let mlReq = {method:'GET',uri: '',contentType: 'application/json',accept: 'application/json' } ;
                mlReq.uri = 'https://api.mercadolibre.com/users/'+argSellerId+'/items_visits?date_from='+argFechaDesde+'&date_to='+argFechaHast;
                //
                this.requestPromise( mlReq )
                    .then(mlVisitas => {
                        respData(mlVisitas) ;
                    })
                    .catch(mlError => {
                        console.dir(mlError) ;
                        respRej( mlError ) ;
                    }) ;
                //
            } catch(errUser){
                respRej(errUser) ;
            }
        }.bind(this)) ;
    }
    //
}
//
module.exports.class    = MercadolibreProductos ;
module.exports.instance = (argConfig) => {
    const mlApi = new MercadolibreProductos(argConfig) ;
    return mlApi ;
}