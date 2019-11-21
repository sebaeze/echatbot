/*
*
*/
const promiseFindUpdate = (docModel,docElem,argArrayBorrar=['ts_ingreso','ts_baja','urlInterna','contador'],argArrayUpdExiste=[]) => {
    return new Promise(function(respDoc,respRech){
        try {
            if ( docElem._id && String(docElem._id).length>0 ){
                docModel.findById(docElem._id, function (err, doc) {
                    if (err){ console.log('....error__findBtID: '); respRech(err); }
                    //
                    let tempDoc = {...docElem} ;
                    //
                    if ( argArrayBorrar.length>0 ){
                        argArrayBorrar.forEach(function(elemKey){
                            delete tempDoc[elemKey] ;
                        }.bind(tempDoc)) ;
                    }
                    //
                    let fnUpdate = 'save' ;
                    if ( doc ){
                        if ( argArrayUpdExiste.length>0 ){
                            let tempCamposUpdate = {} ;
                            argArrayUpdExiste.forEach(function(keyNew){
                                tempCamposUpdate[keyNew]=tempDoc[keyNew] ;
                            }.bind(this)) ;
                            doc = Object.assign(doc,tempCamposUpdate) ;
                        } else {
                            doc = Object.assign(doc,tempDoc) ;
                        }
                        fnUpdate = 'update' ;
                    } else {
                        doc = new docModel(tempDoc) ;
                        doc = Object.assign(doc,tempDoc) ;
                        fnUpdate = 'save' ;
                    }
                    //
                    // let fnMongoUpdate = doc[fnUpdate] ;
                    // console.dir(fnMongoUpdate) ;
                    // doc.save(function(errSave,docSave){
                    // doc[fnUpdate](function(errSave,docSave){
                    doc.save(function(errSave,docSave){
                        if ( errSave ){ respRech(errSave); }
                        else{
                            respDoc( docSave ) ;
                        }
                    }.bind(this));
                    //
                  }.bind(this));
            } else {
                var doc = new docModel(docElem) ;
                doc.save(function(errSave,docSave){
                    if ( errSave ){ respRech(errSave); }
                    else{
                        respDoc( docSave ) ;
                    }
                }.bind(this));
            }
            //
        } catch(errProFU){ console.log('ERROR: docElem: '); console.dir(docElem); respRech(errProFU); }
    }.bind(this)) ;
} ;
//
const promiseFindCond = (docModel,argSelector) => {
    return new Promise(function(respOk,respRech){
        try {
            docModel.findOne(argSelector,function(errF,resuF){
                if ( errF ){
                    respRech(errF) ;
                } else {
                    respOk( resuF ) ;
                }
            }.bind(this)) ;
        } catch(errPFS){
            respRech(errPFS) ;
        }
    }) ;
} ;
//
const promiseFindDelete = (docModel,docElem) => {
    return new Promise(function(respDoc,respRech){
        try {
            docModel.findById(docElem._id, function (err, doc) {
                if (err){ console.log('....error__findBtID: '); respRech(err); }
                //
                let tempDoc = {...docElem} ;
                //
                if ( !doc ){ doc=new docModel(docElem); }
                doc = Object.assign(doc,tempDoc) ;
                if ( !doc.contador ){ doc.contador=0; }
                doc.contador++ ;
                //
                doc.remove(function(errDel,docDel){
                    if ( errDel ){ respRech(errDel); }
                    else{
                        respDoc( {mensaje:'Documento borrado correctamente'} ) ;
                    }
                }.bind(this));
              }.bind(this));
        } catch(errProFU){ respRech(errProFU); }
    }.bind(this)) ;
} ;
//
module.exports = {
    promiseFindUpdate: promiseFindUpdate,
    promiseFindDelete: promiseFindDelete
} ;
//
