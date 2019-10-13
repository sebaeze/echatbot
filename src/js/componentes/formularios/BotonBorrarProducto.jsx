/*
*
*/
/*
*
*/
import React, { Component       } from 'react' ;
//
class BotonBorrarProducto extends Component {
  constructor(props) {
    super(props) ;
    this.state = {permitirClick: this.props.permitirClick} ;
  }
  //
  componentDidMount(){}
  //
  render() {
    //
    return (
        <p className="mt-5">
            <span className="mas-productos" style={this.state.permitirClick==true ? {} : {cursor: 'not-allowed'} }
                    onClick={ this.state.permitirClick==true ? this.props.onClick.bind(this) : null }
                    >
                <i className={this.props.className||''} style={{fontSize:'26px'}}></i>
                <b>  {this.props.titulo}</b><br/>
                <b className="text-info" style={{fontSize:'14px'}}>{this.props.mensaje||''}</b>
            </span>
        </p>
        ) ;
      //
    }
  }
/* */
export default BotonBorrarProducto ;
/* */