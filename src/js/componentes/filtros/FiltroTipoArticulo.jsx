/*
*
*/
import React, {Component}               from 'react' ;
//
class FiltroTipoArticulo extends Component {
    constructor(props){
        super(props) ;
    }
    //
    componentDidMount(){}
    //
    render(){
        //
        return (
            <p className="mb-0">
                <span className="font-weight-bold">Tipo de producto:</span>
                <select id="idFiltroSeccion"
                        className="browser-default custom-select mb-3"
                        onChange={this.props.onChange.bind(this)} defaultValue={0}>
                    <option value="todos">Todos los productos</option>
                    <option value="impresoras">Impresoras</option>
                    <option value="fotocopiadoras">Fotocopiadoras</option>
                    <option value="insumos">Insumos</option>
                </select>
            </p>
        ) ;
    } ;
    //
}
//
export default FiltroTipoArticulo ;
//