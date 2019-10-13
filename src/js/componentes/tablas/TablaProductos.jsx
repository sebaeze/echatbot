/*
*
*/
import React, { Component       }            from 'react' ;
import BootstrapTable                        from 'react-bootstrap-table-next';
import paginationFactory                     from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search }           from 'react-bootstrap-table2-toolkit';
import cellEditFactory, {Type }              from 'react-bootstrap-table2-editor';
import Fade                                  from 'react-reveal/Fade'  ;
import Modal                                 from 'react-bootstrap/Modal'     ;
import Button                                from 'react-bootstrap/Button'    ;
//
import '../../../css/estilosTabla.css'          ;
import 'font-awesome/css/font-awesome.min.css'  ;
import 'bootstrap/dist/css/bootstrap.min.css'   ;
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//
class TablaProductos extends Component {
  constructor(props) {
    super(props) ;
    this.state = {showConfirmacion:false,confirmacionCallback:false} ;
    this.urlFormatter        = this.urlFormatter.bind(this) ;
    this.sortHeaderFormatter = this.sortHeaderFormatter.bind(this) ;
    this.estiloRegistro      = this.estiloRegistro.bind(this)      ;
    this.onClickConfirmar       = this.onClickConfirmar.bind(this) ;
  }
  //
  componentDidMount(){}
  //
  sortHeaderFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        { column.text }
        { sortElement }
      </div>
    );
  }
  //
  estiloRegistro(row, rowIndex){
      const estilo = {};
      try {
        if ( row.modificado && row.modificado==true ){
          if ( row.delete==true ){
            estilo.backgroundColor = '#F2DEDE' ;
            estilo.textDecoration  = 'line-through';
          } else {
            estilo.backgroundColor = '#c8e6c9' ;
          }
        }
      } catch(errEstiloRow){console.dir(errEstiloRow); throw errEstiloRow; }
      return estilo ;
  }
  //
  urlFormatter(argCell, argRow){
      try {
        if ( argRow.url ){
            return (
                <a href={argRow.url} target="_blank" style={{fontSize:'26px'}}><button type="button" className="btn btn-link font-weight-bold">Link</button></a>
            )
        } else {
            return 'N/A' ;
        }
      } catch(errUrlFormat){ console.dir(errUrlFormat); throw errUrlFormat ; }
  }
  //
  onClickConfirmar(argMsg,argCB){
    try {
      this.setState({showConfirmacion:true,confirmacionCallback:argCB})
    } catch(errConf){ console.dir(errConf); }
  }
  //
  render() {
      //
      const columnas = [
        {dataField: '_id'     ,text: 'Codigo Producto',sort: true,editable: false, classes:'cell-codigo-producto'},
        {dataField: 'marca'   ,text: 'Marca' ,sort: true, classes: 'cell-marca', editor: {type:  Type.SELECT, options: this.props.marcas } },
        {dataField: 'precio'  ,text: 'Precio',sort: true, classes:'cell-numeros',headerAlign: (column, colIndex) => 'right'  },
        {dataField: 'nombre'  ,text: 'Nombre',sort: true },
        {dataField: 'categoriaSegunTitulo' ,text: 'Categoria',editor: {type:  Type.SELECT, options: this.props.categorias } },
        {dataField: 'condicion'     ,text: 'Condicion' ,sort: true, editor: {type:  Type.SELECT, options: [{value:'usado',label:'Usado'},{value:'nuevo',label:'Nuevo'}] }},
        {dataField: 'mensaje'       ,text: 'Mensaje',sort: true,classes:'font-weight-bold', editable: false},
        {dataField: 'url'           ,text: 'URL Producto' ,editable: false, formatter: this.urlFormatter.bind(this)},
        {dataField: 'descripcion'   ,text: 'Descripción  ', editor: {type:  Type.TEXTAREA } },
        {dataField: 'vendidos'      ,text: 'Vendidos', editable: false,sort: true, classes:'cell-numeros',headerAlign: (column, colIndex) => 'right' },
        {dataField: 'visitasTotal'  ,text: 'Cantidad Visitas', editable: false,sort: true, classes:'cell-numeros',headerAlign: (column, colIndex) => 'right' }
      ] ;
      //
      const options = {
        insertText: 'Nuevo Producto',
        deleteText: 'Borrar Seleccionado',
        saveText: 'Guardar',
        searchText: 'Buscar',
        closeText: 'Cerrar'
      } ;
      //
      const selectRowProp = {
          mode: 'checkbox',
          onSelect: this.props.onItemSeleccionado.bind(this),
          onSelectAll: this.props.onTodosItemSeleccionados.bind(this)
        };
    //
    const cellEdit = cellEditFactory({
        mode: 'click'
    });
    //
    const handleClose = () => { this.setState({showConfirmacion:false}) } ;
    //
    const { SearchBar, ClearSearchButton } = Search;
    //
    return (
        <ToolkitProvider
                keyField='_id'
                striped
                hover
                bootstrap4
                data={ this.props.productos }
                columns={ columnas }
                selectRow={ selectRowProp }
                cellEdit={ cellEditFactory({ mode: 'click' }) }
                search
            >
                {
                props => (
                    <div>
                      <Modal show={this.state.showConfirmacion} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmación</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                          </Button>
                          <Button variant="primary" onClick={()=>{handleClose();this.state.confirmacionCallback();}}>
                            Confirmar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    <h3 className="mt-3"><u>{this.props.mensaje}</u></h3>
                    <hr />
                    {
                      this.props.productos.length>0 ? <SearchBar { ...{placeholder:'Filtrar',...props.searchProps} } /> : null
                    }
                    <Fade left when={this.props.seleccionados>0} >
                        <span className="mas-productos ml-5" onClick={ () => {this.onClickConfirmar("Esta seguro?",this.props.guardarCambios.bind(this))} }>
                          <i className="fa fa-save" style={{fontSize:'26px'}}></i>  Guardar
                        </span>
                        <span className="mas-productos ml-5" onClick={ () => {this.onClickConfirmar("Esta seguro?",this.props.borrarProductos.bind(this))} }>
                          <i className="fa fa-trash" style={{fontSize:'26px'}}></i>  Borrar
                        </span>
                    </Fade>
                    <hr />
                    <BootstrapTable
                        ref={ this.props.referencia.bind(this) }
                        pagination={ paginationFactory() }
                        rowStyle={ this.estiloRegistro.bind(this) }
                        cellEdit={ cellEditFactory({
                            mode: 'click',
                            blurToSave: true
                            /*
                            beforeSaveCell: (oldValue, newValue, row, column) => {
                                console.log('....estoy por SAVE') ;
                                return true ;
                            }
                            */
                        })
                        }
                        selectRow={ selectRowProp }
                        { ...props.baseProps }
                    />
                    </div>
                )
                }
            </ToolkitProvider>
        ) ;
      //
    }
  }
/* */
export default TablaProductos ;
/* */