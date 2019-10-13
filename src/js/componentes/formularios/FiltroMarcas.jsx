/*
*
*/
/*
*
*/
import React, { Component       } from 'react' ;
//
class FiltroMarcas extends Component {
  constructor(props) {
    super(props);
  }
  //
  componentDidMount(){}
  //
  render() {
    //
    let arrayOpciones = [] ;
    if ( this.props.arrayMarcas.length==0 ){
        arrayOpciones.push( <option value="SeleccioneProductos" key={0}>Seleccione Productos</option> ) ;
    } else {
        arrayOpciones.push( <option value="todos" key={0}>Todas las marcas</option> ) ;
        this.props.arrayMarcas.forEach((argMarca) =>{
            let nombreCapital = argMarca.substr(0,1).toUpperCase() + argMarca.substr(1) ;
            arrayOpciones.push( <option value={argMarca} key={argMarca}>{nombreCapital}</option> ) ;
        }) ;
    }
    //
    return (
            <select id="idFiltroMarcas" className="browser-default custom-select mb-3"  onChange={this.props.onChange} defaultValue={0}>
                {arrayOpciones}
            </select>
        ) ;
      //
    }
  }
/* */
export default FiltroMarcas ;
/* */