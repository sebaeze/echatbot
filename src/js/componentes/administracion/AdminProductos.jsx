/*
*
*/
import React, { Component       }            from 'react' ;
import { BounceLoader }                      from 'react-spinners' ;
import TablaProductos                        from '../tablas/TablaProductos' ;
import {productos}                           from '../../api/apiProductos' ;
import BotonOpcionAdmin                      from '../formularios/BotonOpcionAdmin' ;
import BusquedaProductos                     from '../formularios/BusquedaProductos' ;
import XLSX                                  from 'xlsx';
//
class AdminProductos extends Component {
  constructor(props) {
    super(props) ;
    this.file2Array             = this.file2Array.bind(this) ;
    this.state                  = {productos:[],categorias:[],marcas:[],seleccionados:0,mensaje:'',flagLoadSpinner:false,sidebarDocked: true,sidebarOpen: false} ;
    this.onClickListarTodosProductos = this.onClickListarTodosProductos.bind(this) ;
    this.onClickImportarArchivo = this.onClickImportarArchivo.bind(this) ;
    this.onProductoSeleccionado = this.onProductoSeleccionado.bind(this) ;
    this.onSelectTodosProductos = this.onSelectTodosProductos.bind(this) ;
    this.onClickSincronizarMercadolibre = this.onClickSincronizarMercadolibre.bind(this) ;
    this.guardarProductosSeleccionados         = this.guardarProductosSeleccionados.bind(this) ;
    this.borrarProductosSeleccionados          = this.borrarProductosSeleccionados.bind(this)  ;
    this.downloadAttach           = this.downloadAttach.bind(this) ;
    this.tablaRef                 = this.tablaRef.bind(this)       ;
    this.onSubitBusquedaProducto  = this.onSubitBusquedaProducto.bind(this) ;
  }
  //
  componentDidMount(){
    //
    productos.getTodasCategorias()
             .then(function(respCategorias){
                let tempArrayCat    = Object.keys(respCategorias.categorias).sort().map((elemCat)=>{ return { value: elemCat, label: elemCat } }) ;
                let tempArrayMarcas = Object.keys(respCategorias.marcas).sort().map((elemCat)=>{ return { value: elemCat, label: elemCat } }) ;
                this.setState({categorias: tempArrayCat, marcas:tempArrayMarcas }) ;
             }.bind(this))
             .catch((respErr)=>{
                console.dir(respErr) ;
             }) ;

  }
  //
  onSubitBusquedaProducto(argEvent){
    try {
      argEvent.preventDefault() ;
      let productoBuscar = argEvent.target.querySelector('input') || false ;
      if ( !productoBuscar ){ console.log('...no se encontro productoBuscar'); console.dir(productoBuscar); }
      if ( productoBuscar.length && productoBuscar.length>0 ){ productoBuscar=productoBuscar[0]; }
      productoBuscar = productoBuscar.value || productoBuscar.innerHtml || 'nose' ;
      if ( productoBuscar.length==0 ){ return false; }
      //
      productoBuscar = productoBuscar.toUpperCase() ;
      this.setState( {flagLoadSpinner:true} ) ;
      productos.getProductosCategoria( {query:{textoBusqueda:productoBuscar},limite:1000,campos:['_id','nombre','precio','condicion','vendidos','visitasTotal','imagenes','urlExterna','marca','id','categoriaPrimaria','categoriaSegunTitulo','descripcion','visitasTotal','urlExterna','vendidos']} )
            .then(function(datosBuqueda){
                let arrayProdBus = Object.values(datosBuqueda) ;
                for(let posArrProd=0;posArrProd<arrayProdBus.length;posArrProd++){
                  if ( !arrayProdBus[posArrProd].url ){
                    arrayProdBus[posArrProd].url = arrayProdBus[posArrProd].urlExterna ;
                  }
                }
                if ( arrayProdBus.length && arrayProdBus.length>0 ){
                  this.setState( {productos:arrayProdBus,flagLoadSpinner:false,mensaje:'Se encontraron: '+arrayProdBus.length+' productos.'} ) ;
                } else {
                  this.setState( {flagLoadSpinner:false,mensaje:'Se encontraron: '+arrayProdBus.length+' productos.'} ) ;
                }
            }.bind(this))
            .catch((respErr) => {
                this.setState( {flagLoadSpinner:false} ) ;
                console.log('ERROR:::: ') ;
                console.dir(respErr) ;
            }) ;
      //
    } catch(errSub){console.dir(errSub); }
  }
  //
  onProductoSeleccionado(row, isSelected, e, rowIndex){
    try {
      let tempSeleccionados = this.state.seleccionados || 0 ;
      if ( isSelected==true ){
        tempSeleccionados ++ ;
        this.setState({seleccionados:tempSeleccionados})  ;
      } else {
        tempSeleccionados-- ;
        this.setState({seleccionados:tempSeleccionados})  ;
      }
      //console.log('\n  cantidad: '+this.node.selectionContext.selected.length+' isSelected: '+isSelected+' rowIndex: '+rowIndex+';');
      //
    } catch(errProdSel){ console.dir(errProdSel); throw errProdSel; }
  }
  onClickSincronizarMercadolibre(argEvent){
    try {
      argEvent.preventDefault() ;
      this.setState( {flagLoadSpinner:true} ) ;
      productos.sincronizarMercadolibre()
              .then((respSincro)=>{
                this.setState( {flagLoadSpinner:false} ) ;
                console.dir(respSincro) ;
                return this.onClickListarTodosProductos() ;
              })
              .then((respTab)=>{
                console.log('....termine cargar producto sincronizados') ;
              })
              .catch((respErr)=>{
                if ( typeof respErr=="object" ){
                  respErr = respErr.error || respErr.Error || JSON.stringify(respErr) ;
                }
                this.setState( {flagLoadSpinner:false,mensaje: 'Se ha producido un error. \n Intente más tarde. \n Mensaje: '+respErr } ) ;
                console.dir(respErr) ;
              }) ;
    } catch(errSinc){ console.dir(errSinc); throw errSinc ;}
  }
  //
  onSelectTodosProductos(isSelect,rows,e){
    try {
      if ( isSelect==true ){
        let tempCantidad = this.state.productos.length ;
        this.setState({seleccionados:tempCantidad})  ;
      } else {
        this.setState({seleccionados:0})  ;
      }
    } catch(errTodProd){ console.dir(errTodProd); }
  }
  //
  guardarProductosSeleccionados(){
    try {
      this.setState( {flagLoadSpinner:true} ) ;
      let arrayProdSeleccionados = this.state.productos.filter(function(elemProd){
        let objEncontrado = this.node.selectionContext.selected.find(function(elemBus){ return String(elemProd._id)==String(elemBus);}.bind(this)) || false ;
        return objEncontrado ;
      }.bind(this)) ;
      //
      productos.addProductos( arrayProdSeleccionados )
               .then((respOK)=>{
                 // UPDATE array actual de productos
                 let tempArrayStateProductos = this.state.productos ;
                 for( let posArr=0;posArr<respOK.length;posArr++ ){
                    let objResp        = respOK[posArr] ;
                    let posProdBuscado = tempArrayStateProductos.findIndex((elemBus)=>{ return elemBus._id==objResp._id; }) ;
                    if ( posProdBuscado != -1 ){
                      objResp.modificado = true ;
                      objResp.delete     = false ;
                      tempArrayStateProductos[posProdBuscado] = objResp ;
                    }
                 }
                 this.setState( {seleccionados:0,flagLoadSpinner:false,productos:tempArrayStateProductos,mensaje: 'Productos actualizado: '+arrayProdSeleccionados.length+'.' } ) ;
               })
               .catch((respErr)=>{
                 this.setState( {seleccionados:0,flagLoadSpinner:false} ) ;
                 console.dir(respErr) ;
               });
    } catch(errGuar){console.dir(errGuar); }
  }
  //
  downloadAttach(argEvent){
    try{
      argEvent.preventDefault() ;
      let argUrlAttach = argEvent.target.getAttribute('archivo') || '' ;
      let aTempAttach  = document.createElement('a') ;
      aTempAttach.href     = argUrlAttach ;
      let nombreArchivo    = argUrlAttach.split('/') ;
      if ( nombreArchivo.length==0 ){
        nombreArchivo = argUrlAttach ;
      } else {
        nombreArchivo = nombreArchivo[ (nombreArchivo.length-1)] ;
      }
      aTempAttach.download = nombreArchivo ;
      aTempAttach.setAttribute('target','_blank' ) ;
      document.body.appendChild(aTempAttach) ;
      aTempAttach.click() ;
      aTempAttach.parentNode.removeChild( aTempAttach ) ;
    } catch( errAtt ){
      console.dir(errAtt) ;
      throw errAtt ;
    }
  }
  //
  borrarProductosSeleccionados(){
    try {
      this.setState( {flagLoadSpinner:true} ) ;
      let arrayProdSeleccionados = this.state.productos.filter(function(elemProd){
        let objEncontrado = this.node.selectionContext.selected.find(function(elemBus){ return String(elemProd._id)==String(elemBus);}.bind(this)) || false ;
        return objEncontrado ;
      }.bind(this)) ;
      //
      productos.deleteProductos( arrayProdSeleccionados )
               .then((respOK)=>{
                 let tempArrayStateProductos = this.state.productos ;
                 for( let posArr=0;posArr<respOK.length;posArr++ ){
                    let objResp        = respOK[posArr] ;
                    let posProdBuscado = tempArrayStateProductos.findIndex((elemBus)=>{ return elemBus._id==objResp._id; }) ;
                    if ( posProdBuscado != -1 ){
                      objResp.modificado = true ;
                      objResp.delete     = true ;
                      objResp.url        = '' ;
                      tempArrayStateProductos[posProdBuscado] = objResp ;
                    }
                 }
                 this.setState( {seleccionados:0,flagLoadSpinner:false,productos:tempArrayStateProductos,mensaje: 'Productos borrados: '+arrayProdSeleccionados.length+'.' } ) ;
               })
               .catch((respErr)=>{
                 this.setState( {seleccionados:0,flagLoadSpinner:false} ) ;
                 console.dir(respErr) ;
               });
      //
    } catch(errGuar){console.dir(errGuar); }
  }
  //
  onClickImportarArchivo(argEvent){
    try {
        argEvent.preventDefault() ;
        let inputFileCpto = document.createElement('input') ;
        inputFileCpto.id  = 'idFileAdjunto'+new Date().toISOString() ;
        inputFileCpto.setAttribute('type','file') ;
        inputFileCpto.setAttribute('name',inputFileCpto.id) ;
        inputFileCpto.setAttribute('data-widget','fileinput') ;
        inputFileCpto.style = 'display:none;' ;
        document.body.appendChild( inputFileCpto ) ;
        inputFileCpto.addEventListener('change',function(argEvent){
          try {
            let tempFiles = argEvent.target.files ;
            for ( let indFiles=0;indFiles<tempFiles.length;indFiles++){
              let fileElem       = tempFiles[indFiles] ;
              this.file2Array( fileElem )
                  .then((respArra)=>{
                    this.setState( {productos:respArra,mensaje:('Se cargaron: '+respArra.length+' productos. Debe guardar.'),flagLoadSpinner:false} ) ;
                  })
                  .catch((respErr)=>{
                    console.dir(respErr) ;
                  }) ;
            }
          } catch( errConvXls ){
            console.dir(errConvXls) ;
          }
        }.bind(this));
        // Trigger evento
        inputFileCpto.click() ;
    } catch(errImp){ console.dir(errImp); }
  }
  //
  file2Array(argFile){
    return new Promise(function(respDatos,respRech){
      try{
        let extension         = 'xls' ;
        let sFilename         = '' ;
        let oFile             ;
        oFile         = argFile ;
        sFilename     = oFile.name;
        extension     = sFilename.split(".") ;
        extension     = extension[ (extension.length-1) ] ;
        extension = extension.toUpperCase() ;
        if ( extension!='XLS' && extension!="XLSX" && extension!="ODS" ){
          respRech('Extensión: '+extension+' no soportada. <br> Extensiones aceptadas: xls, xlsx, ods.') ;
        }
        //
        this.setState( {flagLoadSpinner:true} ) ;
        //
        var reader         = new FileReader();
        var arrayProductos = [] ;
        reader.onload = function(e) {
          var data = e.target.result;
          var wb  ;
          try{
            var rABS = true;
            if(!rABS) data = new Uint8Array(data);
            wb = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
            wb.SheetNames.forEach(function(sheetName) {
              let arrayRecs    = XLSX.utils.sheet_to_json( wb.Sheets[sheetName] , {header:1});
              let objKeys = {} ;
              for(let posReg=0;posReg<arrayRecs.length;posReg++){
                let arrayCamposProducto = arrayRecs[posReg] ;
                let objProducto         = {} ;
                for( let posCampo=0;posCampo<arrayCamposProducto.length;posCampo++){
                  let campoProd = arrayCamposProducto[posCampo] ;
                  if ( posReg==0 ){
                    objKeys[posCampo] = campoProd ;
                  } else {
                    objProducto[ objKeys[posCampo] ] = campoProd ;
                  }
                }
                if ( posReg>0 ){
                  if ( !objProducto.url     ){ objProducto.url=''; }
                  if ( !objProducto.mensaje ){ objProducto.mensaje = ''; }
                  if ( !objProducto.nombre  ){ objProducto.nombre = 'Producto sin nombre'; }
                  arrayProductos.push( objProducto ) ;
                }
                //
              } ;
            }.bind(this));
            //
            respDatos( arrayProductos ) ;
            //
          } catch( errParse ){
            console.dir(errParse) ;
            respRech( errParse ) ;
          }
        }.bind(this);
        //
        reader.readAsBinaryString(oFile);
        //
      } catch(errFil){ console.dir(errFil); respRech(errFil); }
    }.bind(this)) ;
    //
  }
  //
  parseCsv2Ob(argCsv){
    let outArrayConceptosObj = [] ;
    try {
      let arrayCsvElementos = argCsv.split('\n') ;
      for ( let keyIndex in arrayCsvElementos ){
        let argCsvElem          = arrayCsvElementos[keyIndex] ;
        let arrayCamposConcepto = argCsvElem.split(',') ;
        console.dir(arrayCamposConcepto) ;
      } ;
    } catch( errParseCsv ){
      //console.dir(outObjetoConcepto) ;
      throw new Error('this.parseCsv2Ob::ERROR: '+errParseCsv+';');
    }
    return outArrayConceptosObj ;
  };
  //
  onClickListarTodosProductos(){
    try {
      this.setState( {flagLoadSpinner:true} ) ;
      productos.getProductosCategoria( {query:{},limite:1000,campos:['_id','nombre','precio','condicion','vendidos','visitasTotal','imagenes','urlExterna','marca','id','categoriaPrimaria','categoriaSegunTitulo','descripcion','visitasTotal','urlExterna','vendidos']} )
            .then(function(datosBuqueda){
                let arrayProdBus = Object.values(datosBuqueda) ;
                for(let posArrProd=0;posArrProd<arrayProdBus.length;posArrProd++){
                  if ( !arrayProdBus[posArrProd].url ){
                    arrayProdBus[posArrProd].url = arrayProdBus[posArrProd].urlExterna ;
                  }
                }
                this.setState( {productos:arrayProdBus,flagLoadSpinner:false,mensaje:'Se encontraron: '+arrayProdBus.length+' productos.'} ) ;
            }.bind(this))
            .catch((respErr) => {
                this.setState( {flagLoadSpinner:false} ) ;
                console.log('ERROR:::: ') ;
                console.dir(respErr) ;
            }) ;
      //
    } catch(errListAll){console.dir(errListAll); }
  }
  //
  tablaRef(n){ this.node = n ; }
  //
  render() {
    //
    return (
        <div className="row w-100">
            <div className="col-md-2 col-sm-2">
               <BotonOpcionAdmin   permitirClick={!this.state.flagLoadSpinner}
                                    onClick={this.props.menuLateral.bind(this)}
                                    className={"fa fa-navicon"}
                                    titulo={"Menu Principal"}
                                    mensaje={""}
                                    />
                <hr/>
                <BotonOpcionAdmin permitirClick={!this.state.flagLoadSpinner}
                                    onClick={this.onClickImportarArchivo.bind(this)}
                                    className={"fa fa-file-excel-o"}
                                    titulo={"Importar XLXS"}
                                    mensaje={""}
                />
                <p>
                    <a href="#" style={{color: '#3b6caa',fontSize:'14px'}}
                                className="mas-productos"
                                archivo={'/import_productos_template.xlsx'}
                                onClick={this.downloadAttach.bind(this)} >
                        Template Importación Productos
                    </a>
                </p>
                <hr/>
                <BotonOpcionAdmin permitirClick={!this.state.flagLoadSpinner}
                                    onClick={this.onClickListarTodosProductos.bind(this)}
                                    className={"fa fa-database"}
                                    titulo={"Todos los productos"}
                                    mensaje={""}
                />
                <BotonOpcionAdmin permitirClick={!this.state.flagLoadSpinner}
                                    onClick={this.onClickSincronizarMercadolibre.bind(this)}
                                    className={"fa fa-refresh"}
                                    titulo={"Sincronizar Mercadolibre"}
                                    mensaje={"(Puede tardar varios minutos)"}
                                    />
            </div>
            <div className="col-md-10 col-sm-10">
            {
            this.state.flagLoadSpinner==true ?
                <div className="d-flex mt-5 justify-content-center">
                    <BounceLoader
                                css={{position:'absolute'}}
                                sizeUnit={"px"}
                                size={250}
                                color={'#2dc997'}
                                loading={this.state.flagLoadSpinner}
                            />
                </div>
                :
                <div>
                  <div className="row">
                    <BusquedaProductos onSubmit={this.onSubitBusquedaProducto.bind(this)} />
                    <TablaProductos productos={this.state.productos}
                                marcas={this.state.marcas}
                                seleccionados={this.state.seleccionados}
                                guardarCambios={this.guardarProductosSeleccionados.bind(this)}
                                borrarProductos={this.borrarProductosSeleccionados.bind(this)}
                                categorias={this.state.categorias}
                                onItemSeleccionado={this.onProductoSeleccionado.bind(this)}
                                onTodosItemSeleccionados={this.onSelectTodosProductos.bind(this)}
                                mensaje={this.state.mensaje}
                                referencia={this.tablaRef.bind(this)}
                                />
                    </div>
                  </div>
            }
        </div>
    </div>
        ) ;
      //
    }
  }
/* */
export default AdminProductos ;
/* */