/*
*
*/
import React                            from 'react' ;
import { Typography, Row, Col, Icon }   from 'antd'  ;
//
import '../../css/estilosPrices.css' ;
//
const { Title, Text }   = Typography ;
//
export class CuerpoPrices extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        return(
            <div style={{paddingTop:'120px'}}>
                <Row>
                    <Col xs={2} md={2} lg={2} xl={2} xxl={2} ></Col>
                    <Col xs={16} md={16} lg={18} xl={18} xxl={18} >
                        <Title style={{width:'100%',textAlign:'center'}}>Planes</Title>
                        <Title level={4}>{this.props.translate.betaPlanLeyend}</Title>
                    </Col>
                </Row>
                <Row style={{paddingTop:'50px'}}>
                    <Col xs={2} md={2} lg={8} xl={8} xxl={8} ></Col>
                    <Col xs={18} md={18} lg={8} xl={8} xxl={8} >
                        <div className="box-plan">
                            <div className="title" >
                                <Title level={2}>Beta</Title>
                            </div>
                            <div>
                                <a>Crear cuenta</a>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>100 Mensajes x Mes</Text>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>Dashboard</Text>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>Metrics</Text>
                            </div>
                            <div className="price" >
                                <Text>Free</Text>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{minHeight:'100px'}}>

                </Row>
            </div>
        )
    }
    //
} ;
//