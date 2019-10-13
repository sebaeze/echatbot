/*
*
*/
import React, { Component }                     from 'react'  ;
import { Row, Col, Typography, Form, Input, Button, Spin }    from 'antd'   ;
import FormSuscripcion                          from './formularios/FormSuscripcion' ;
//
import '../../css/estilosPiePagina.css' ;
//
const { Text, Title }      = Typography ;
//
class PiePagina extends Component {
  constructor(props) {
    super(props) ;
    this.state = {flagEnviandoForm: false} ;
  }
  //
  componentDidMount(){}
  //
  onClickAreaMiembros(argEvent){
    try {
      argEvent.preventDefault() ;
    } catch(errClickArea){console.dir(errClickArea); }
  }
  //
  render() {
    //
    return (
        //
        <footer id="footer">
          <Row style={{minHeight:'85%'}} >
              <Col xs={1}  md={1}  xl={1}></Col>
              <Col xs={23} md={23} xl={7}>
                <Title level={3}>Productos</Title>
                <Text type="secondary"><a href="#">Impresoras</a></Text>
                <Text type="secondary"><a href="#">Fotocopiadoras</a></Text>
                <Text type="secondary"><a href="#">Multi-funciones</a></Text>
              </Col>
              <Col xs={1}  md={1}  xl={0}></Col>
              <Col xs={23} md={23} xl={7} >
                <Title level={3}>Servicios</Title>
                <Text type="secondary"><a href="#">Servicio Tecnico</a></Text>
                <Text type="secondary"><a href="#">Soluciones Empresariales</a></Text>
              </Col>
              <Col xs={1}  md={1}  xl={0}></Col>
              <Col xs={22} md={22} xl={7} >
                <Title level={3}>Novedades</Title>
                <FormSuscripcion />
              </Col>
          </Row>
          <Row style={{minHeight:'1%'}} >
              <Col span={1}></Col>
              <Col span={22}><hr/></Col>
              <Col span={1}></Col>
          </Row>
          <Row style={{minHeight:'3%'}} >
            <Col span={1}></Col>
            <Col span={12}>
              <Text type="secondary">© 2019 Designed by <a href="#">SEA</a></Text>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
        </footer>
       //
    )
  }
}
/* */
const WrappedPiePagina = Form.create({ name: 'suscripcion' })(PiePagina);
export default WrappedPiePagina ;
/* */