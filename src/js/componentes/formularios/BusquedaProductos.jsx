/*
*
*/
import React, { Component }          from 'react'  ;
import Form                          from 'react-bootstrap/Form' ;
import Button                        from 'react-bootstrap/Button' ;
//
class BusquedaProductos extends Component {
  constructor(props) {
    super(props);
    this.state  = {productos:[]} ;
  }
  //
  componentDidMount(){}
  //
  render() {
    //
    return (
        <Form className="w-100" onSubmit={this.props.onSubmit.bind(this)} >
            <Form.Group controlId="productoBuscado" className="d-flex justify-content-end">
                <Form.Control placeholder="Buscar producto (marca, tipo, modelo, nombre, precio, etc) " className="w-100 d-inline "/>
                <Button variant="primary" type="submit" className="w-25 ml-1 d-inline ml-1" style={{padding:'0px !important',lineHeight:'1'}} >Buscar</Button>
            </Form.Group>
        </Form>
      )
      //
    }
  }
/* */
export default BusquedaProductos ;
/* */