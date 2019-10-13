/*
*
*/
const path            = require('path')             ;
const router          = require('express').Router() ;
//
let busquedaProductos = {
  queryProds: { limite:200, sort:['vendidos','visitasTotal'], campos:['_id','nombre','precio','condicion','vendidos','visitasTotal','imagenes','urlExterna','marca','id','categoriaPrimaria','categoriaSegunTitulo'] },
  cacheProductos:[],
  cacheQuery: false
};
//
module.exports = (argUtilitario,argDb,argConfig) => {
  //
  const autenticado     = require( path.join(__dirname,'../auth/autenticado')  ).autenticado(argDb) ;
  const tagsProductos   = Object.assign({...argConfig.metaTags.default},{...argConfig.metaTags.productos}) ;
  //
  const productosCache = (argQuery) => {
    return new Promise(function(respArr,respRech){
      try {
        if ( JSON.stringify(busquedaProductos.cacheQuery)==JSON.stringify(argQuery) ){
          respArr( busquedaProductos.cacheProductos )  ;
        } else {
          let tempQry = Object.assign({...busquedaProductos.queryProds},{...argQuery}) ;
          argDb.productos.get( tempQry )
              .then(function(resuProds){
                console.log('....encontre productos::l: '+resuProds.length) ;
                busquedaProductos.cacheQuery     = argQuery  ;
                busquedaProductos.cacheProductos = resuProds ;
                respArr(resuProds) ;
              }.bind(this))
              .catch(function(resuRech){
                console.log('....error buscando productos ') ;
                console.dir(resuRech) ;
                respRech(resuRech) ;
              }.bind(this)) ;
        }
      } catch(errBus){ respRech(errBus) ; } ;
    }.bind(this)) ;
  } ;
  //
  router.get('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    let tempSeccion = req.query.qs || 'productos' ;
    let tempQuery   = req.query ? {...req.query} : false ;
    if ( tempQuery.qs    ){ tempQuery.categoriaPrimaria = {"$in":[tempQuery.qs,tempQuery.qs.toUpperCase()]} ; tempQuery.limite=300; delete tempQuery.qs ; }
    if ( tempQuery.marca ){ tempQuery.marca             = {"$in":[tempQuery.marca,tempQuery.marca.toUpperCase()]} ;tempQuery.limite=300; }
    productosCache( tempQuery )
      .then(function(arrayProds){
          tagsProductos.globalProductos = JSON.stringify(arrayProds) ;
          res.render( 'app.html', tagsProductos ) ;
      }.bind(this))
      .catch(()=>{
        res.render( 'app.html', tagsProductos ) ;
      }) ;
    //
    let tempEstadisticaVisita = { _id: tempSeccion/* req.baseUrl */, tipo: 'pagina', titulo: '',
                                  http:{...req.headers,...{query:req.query}} } ;
    argDb.estadisticas.addEstadistica( tempEstadisticaVisita )
        .then(function(respDb){ /* no hago nada */  })
        .catch(function(errDb){ console.log('....ERROR cargando estadistica: URL: '+req.baseUrl);console.dir(errDb);  })
    //
  });
  //
  router.get('/api', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      console.log('....voy a filtrar: query: '+req.query.categoria) ;
      mlApi.productosSegunCategoria(req.query.categoria)
        .then(function(respReq){
          res.json( respReq );
        }.bind(this))
        .catch(function(respRej){
          console.dir(respRej) ;
          res.status(500) ;
          res.json(respRej) ;
        }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  const validaProducto = (argObjProd) => {
    let outValida = {result:true,mensajes:[]}
    try {
      if ( !argObjProd._id ){
        outValida.result = false ;
        outValida.mensajes.push("falta codigo de producto. Campo _id") ;
      }
      if ( !argObjProd.precio ){
        outValida.result = false ;
        outValida.mensajes.push("falta precio") ;
      }
      if ( !argObjProd.descripcion ){
        outValida.result = false ;
        outValida.mensajes.push("falta descripcion") ;
      }
      if ( !argObjProd.titulo ){
        outValida.result = false ;
        outValida.mensajes.push("falta titulo") ;
      }
      if ( !argObjProd.categoriaSegunTitulo ){
        outValida.result = false ;
        outValida.mensajes.push("falta categoria de producto. Campo: categoriaSegunTitulo") ;
      }
    } catch(errVal){ outValida.result=false; outValida.mensajes.push(errVal); }
    return outValida ;
  }
  //
  router.post('/api', autenticado, function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      //
      let arrayProductos = Array.isArray(req.body) ? req.body : new Array({...req.body}) ;
      let arrayValidos   = [] ;
      for(let posProd=0;posProd<arrayProductos.length;posProd++){
        let objProducto = arrayProductos[posProd] ;
        if ( !objProducto.titulo && objProducto.nombre ){ objProducto.titulo=objProducto.nombre; }
        let resultado   = validaProducto( objProducto ) ;
        if ( resultado.result==true ){
          objProducto.precio    = parseFloat(String(objProducto.precio).replace(",",".").trim()) ;
          objProducto.mensaje   = 'Producto cargado con exito.' ;
          objProducto.url       = '/catalogo/' + objProducto.categoriaSegunTitulo + '/' + objProducto._id + '-' + objProducto.titulo ;
          objProducto.emailUltimaModificacion = req.user.email || '_NO_EMAIL_' ;
          arrayValidos.push( {...objProducto} ) ;
        } else {
          objProducto.resultado = resultado ;
          objProducto.mensaje   = resultado.mensajes.join('. ') ;
          objProducto.url       = 'N/A' ;
        }
      }
      //
      if ( arrayValidos.length==0 ){
        res.json( arrayProductos );
      } else {
        console.log('\n\n.....voy a hacer update') ;
        argDb.productos.add( arrayValidos )
            .then(function(respUpdate){
              console.log('....respuesta del update/add:: ')  ;
              console.dir(respUpdate) ;
              res.json( arrayProductos );
            }.bind(this))
            .catch(function(respErr){
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      }
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.delete('/api', autenticado, function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    //
    try{
      //
      let arrayProductos = Array.isArray(req.body) ? req.body : new Array({...req.body}) ;
      let arrayValidos   = [] ;
      for(let posProd=0;posProd<arrayProductos.length;posProd++){
        let objProducto = arrayProductos[posProd] ;
        if ( !objProducto.titulo && objProducto.nombre ){ objProducto.titulo=objProducto.nombre; }
        let resultado   = validaProducto( objProducto ) ;
        if ( resultado.result==true ){
          objProducto.precio    = parseFloat(String(objProducto.precio).replace(",",".").trim()) ;
          objProducto.mensaje   = 'Producto cargado con exito.' ;
          objProducto.url       = '/catalogo/' + objProducto.categoriaSegunTitulo + '/' + objProducto._id + '-' + objProducto.titulo ;
          objProducto.emailUltimaModificacion = req.user.email || '_NO_EMAIL_' ;
          arrayValidos.push( {...objProducto} ) ;
        } else {
          objProducto.resultado = resultado ;
          objProducto.mensaje   = resultado.mensajes.join('. ') ;
          objProducto.url       = 'N/A' ;
        }
      }
      //
      if ( arrayValidos.length==0 ){
        res.json( arrayProductos );
      } else {
        console.log('\n\n.....voy a hacer DELETE ') ;
        argDb.productos.delete( arrayValidos )
            .then(function(respUpdate){
              console.log('....respuesta del DELETE:: ')  ;
              console.dir(respUpdate) ;
              res.json( arrayProductos );
            }.bind(this))
            .catch(function(respErr){
              res.status(500) ;
              res.json(respErr) ;
            }.bind(this)) ;
      }
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.get('/query', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    try{
      //
      let tempQuery = {...req.query} ;
      if ( tempQuery.marca && String(tempQuery.marca).indexOf('-') ){
        // Corrige busqueda para marca con separador '-'
        tempQuery.marca = {$in:[ tempQuery.marca, String(tempQuery.marca).replace(/-/g,' ') ]}
      }
      //
      argDb.productos.get(tempQuery)
        .then(function(respReq){
          res.json( respReq );
        }.bind(this))
        .catch(function(respRej){
          console.dir(respRej) ;
          res.status(500) ;
          res.json(respRej) ;
        }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  router.get('/queryCategorias', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    try{
      //
      argDb.productos.getCategoriasCantidad()
            .then( function(respCat){
                res.json( respCat );
            }.bind(this))
            .catch((respErr)=>{
                console.dir(respErr) ;
                res.status(500) ;
                res.json(respErr) ;
            }) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  router.get('/portfolio', function(req, res) {
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Credentials", true);
    try{
      let objRespuesta = {} ;
      let objBusqueda  = {categoriaPrimaria:'IMPRESORAS',limite:20,sort:'vendidos,visitasTotal',campos:'id,imagenes,thumbnail,title,categoriaPrimaria,marca,nombre,categoriaSegunTitulo'} ;
      argDb.productos.get( objBusqueda )
        .then(function(respImp){
          objRespuesta['impresoras'] = respImp ;
          objBusqueda.categoriaPrimaria = 'FOTOCOPIADORAS' ;
          return argDb.productos.get( objBusqueda ) ;
        }.bind(this))
        .then(function(respFot){
          objRespuesta['fotocopiadoras'] = respFot ;
          objBusqueda.categoriaPrimaria = 'INSUMOS' ;
          return argDb.productos.get( objBusqueda ) ;
        }.bind(this))
        .then(function(respIns){
          objRespuesta['insumos'] = respIns ;
          delete objBusqueda.categoriaPrimaria ;
          objBusqueda['marca'] = 'SINDOH' ;
          return argDb.productos.get( objBusqueda ) ;
        }.bind(this))
        .then(function(respSind){
          objRespuesta['sindoh'] = respSind ;
          res.json( objRespuesta );
        }.bind(this))
        .catch(function(respRej){
          console.dir(respRej) ;
          res.status(500) ;
          res.json(respRej) ;
        }.bind(this)) ;
      //
    } catch(errRe){
      res.status(500) ;
      res.json(errRe) ;
    }
  });
  //
  return router ;
  //
}
//