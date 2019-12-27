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
        <footer id="waiboc-footer" style={{zIndex:'100',marginTop:'10px',boxShadow:'0 -8px -6px -6px black'}}>
          <Row style={{minHeight:'85%'}} >
              <Col xs={1}  md={1}  xl={1}></Col>
              <Col xs={23} md={23} xl={7}>
                <Title level={3}>{this.props.translate.services}</Title>
                <Text type="secondary"><a href="#">{this.props.translate.chatbot}</a></Text>
                <Text type="secondary"><a href="#">{this.props.translate.cognitiveAnalytics}</a></Text>
              </Col>
              <Col xs={1}  md={1}  xl={0}></Col>
              <Col xs={23} md={23} xl={7} >
                <Title level={3}>{this.props.translate.help}</Title>
                <Text type="secondary"><a href="#">{this.props.translate.FAQ}</a></Text>
                <Text type="secondary"><a href="#">Blog</a></Text>
              </Col>
              <Col xs={1}  md={1}  xl={0}></Col>
              <Col xs={22} md={22} xl={7} >
                <Title level={3}>{this.props.translate.news}</Title>
                <FormSuscripcion  translate={this.props.translate} />
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
              <Text type="secondary">© 2019 Designed by <a href="#">{this.props.configuracion.empresa.name}</a></Text>
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